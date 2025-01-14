/* Amplify Params - DO NOT EDIT
	API_PREDICTIONSAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_PREDICTIONSAPP_GRAPHQLAPIIDOUTPUT
	API_PREDICTIONSAPP_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { Sha256 } = require('@aws-crypto/sha256-js');
const { defaultProvider } = require('@aws-sdk/credential-provider-node');
const { SignatureV4 } = require('@aws-sdk/signature-v4');
const { HttpRequest } = require('@aws-sdk/protocol-http');
const { default: fetch, Request } = require('node-fetch');
const { CognitoIdentityProviderClient, ListUsersCommand } = require("@aws-sdk/client-cognito-identity-provider");
const { SESClient, SendBulkTemplatedEmailCommand } = require("@aws-sdk/client-ses");

const GRAPHQL_ENDPOINT = process.env.API_PREDICTIONSAPP_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || 'eu-west-1';
const userPoolId = process.env.COGNITO_USERPOOLID;

const cognitoClient = new CognitoIdentityProviderClient({region: AWS_REGION});
const sesClient = new SESClient({region: AWS_REGION});

const fetchPredictions = require('./query.js').predictionsQuery;
const createRoundForUser = require('./query.js').createRoundMutation;
const fetchSeasonForUser = require('./query.js').seasonUserQuery;
const createSeasonForUser = require('./query.js').createSeasonMutation;
const updateSeasonForUser = require('./query.js').updateSeasonMutation;
const fetchNextRound = require('./query.js').pendingRoundsQuery;
const updateRoundToActive = require('./query.js').activateRoundMutation;
const fetchPreferences = require('./query.js').preferencesQuery;
const fetchResults = require('./query.js').resultsQuery;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    //eslint-disable-line
    console.log(JSON.stringify(event, null, 2));
    console.log(event.Records[0].eventName);

    if (event.Records[0].eventName === "MODIFY"
        && event.Records[0].dynamodb.NewImage.status.S === "complete"
        && event.Records[0].dynamodb.OldImage.status.S === "closed") {
        try {
            const predictions = await callGraphqlApi(
                fetchPredictions,
                "predictionsByRound",
                {"roundId": event.Records[0].dynamodb.NewImage.id.S});

            await applyRoundPoints(predictions);

            await Promise.all(predictions.items.map(prediction => applySeasonPoints(prediction)));

            const rounds = await callGraphqlApi(fetchNextRound, "roundByStatus", null);

            if (rounds.items.length > 0) {
                await activateRound(rounds.items[0].id, Number(event.Records[0].dynamodb.NewImage.number.N) + 1);
            }

            const results = await callGraphqlApi(fetchResults, "listResults", {"roundId": event.Records[0].dynamodb.NewImage.id.S});
            const preferences = await callGraphqlApi(fetchPreferences, "listPreferences");
            const optOutUsers = preferences.items.filter(item => item.results == true).map(item => item.owner);

            let paginationToken = undefined;
            do {
                const usersResponse = await cognitoClient.send(new ListUsersCommand({
                    UserPoolId: userPoolId,
                    PaginationToken: paginationToken,
                    Limit: 50,
                    AttributesToGet: ['email'],
                    Filter: 'cognito:user_status="CONFIRMED"'
                }));

                const destinations = usersResponse.Users.filter(user => !optOutUsers.includes(user.Username)).map(function (user) {
                    return {
                        "Destination": {"ToAddresses": [user.Attributes[0].Value]},
                        "ReplacementTemplateData": JSON.stringify({"username": user.Username})
                    }
                });

                await notifyUsers(results, destinations);
                paginationToken = usersResponse.PaginationToken
            } while(paginationToken);

            return {
                statusCode: 200,
                body: JSON.stringify("leaderboards updated")
            };
        } catch (err) {
            console.log(err);
            return {
                statusCode: 500,
                body: JSON.stringify(err)
            };
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify("round not modified from closed to complete")
    };

};

async function notifyUsers(results, destinations) {
    const bulkTemplatedEmail = {
        "Source": "Super Leigh ! <superleigh@rocsolidservices.co.uk>",
        "Template": "Results",
        "ConfigurationSetName": "SuperLeigh",
        "Destinations": destinations,
        "DefaultTemplateData": JSON.stringify({
            "username": "Friend",
            "home_team": results.items[0].round.homeTeam.name,
            "home_score": results.items[0].homeScore,
            "away_team": results.items[0].round.awayTeam.name,
            "away_score": results.items[0].awayScore
        })
    }
    console.log(JSON.stringify(bulkTemplatedEmail));

    const sentEmails = await sesClient.send(new SendBulkTemplatedEmailCommand(bulkTemplatedEmail));
    console.log(sentEmails);
}

async function applyRoundPoints(predictions) {
    return await Promise.all(predictions.items.map(prediction =>
        callGraphqlApi(createRoundForUser, "createRoundLeaderboard", {
            roundId: prediction.roundId,
            username: prediction.owner,
            points: prediction.points
        })));
}

async function applySeasonPoints(prediction) {
    const seasonRecord = await callGraphqlApi(fetchSeasonForUser, "seasonLeaderboardByPoints", {
        season: 5,
        username: prediction.owner
    });

    if (seasonRecord.items.length < 1) {
        return await callGraphqlApi(createSeasonForUser, "createSeasonLeaderboard", {
            season: 5,
            username: prediction.owner,
            points: prediction.points
        });
    } else {
        return await callGraphqlApi(updateSeasonForUser, "updateSeasonLeaderboard", {
            id: seasonRecord.items[0].id,
            points: seasonRecord.items[0].points + prediction.points
        });
    }
}

async function activateRound(roundId, number) {
    return await callGraphqlApi(updateRoundToActive, "updateRound", {
        id: roundId,
        number: number
    });
}

async function callGraphqlApi(query, operationName, variables) {
    const endpoint = new URL(GRAPHQL_ENDPOINT);

    const signer = new SignatureV4({
        credentials: defaultProvider(),
        region: AWS_REGION,
        service: 'appsync',
        sha256: Sha256
    });

    const requestToBeSigned = new HttpRequest({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            host: endpoint.host
        },
        hostname: endpoint.host,
        body: JSON.stringify({ query, operationName, variables }),
        path: endpoint.pathname
    });

    const signed = await signer.sign(requestToBeSigned);
    const request = new Request(GRAPHQL_ENDPOINT, signed);

    let body;
    let response;

    try {
        response = await fetch(request);
        body = await response.json();
    } catch (error) {
        console.log(error);
        console.log(`Failed during ${operationName} query`);
        console.log("Request: ", requestToBeSigned.body);
        console.log("Response: ", JSON.stringify(body));

        throw error;
    }

    return body.data[operationName];
}