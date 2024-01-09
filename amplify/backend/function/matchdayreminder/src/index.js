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

const fetchActiveRound = require('./query.js').activeRoundQuery;
const fetchPreferences = require('./query.js').preferencesQuery;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    //eslint-disable-line
    try {
        const rounds = await callGraphqlApi(fetchActiveRound, "roundByStatus");

        if (rounds.items.length > 0) {
            const round = rounds.items[0];

            const tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);

            const matchday = new Date(round.kickOff);
            matchday.setHours(0, 0, 0, 0);

            if (tomorrow.getTime() === matchday.getTime()) {
                const preferences = await callGraphqlApi(fetchPreferences, "listPreferences");
                const optOutUsers = preferences.items.filter(item => item.matchday == true).map(item => item.owner);

                const kickoffTime = new Date(round.kickOff);
                const bstStart = getLastSunday(kickoffTime.getFullYear(), 3);
                const bstEnd = getLastSunday(kickoffTime.getFullYear(), 10);
                //add hour if in BST
                if (kickoffTime > bstStart && kickoffTime < bstEnd) {
                    kickoffTime.setHours(kickoffTime.getHours() + 1);
                }

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

                    await notifyUsers(round, kickoffTime, destinations);
                    paginationToken = usersResponse.PaginationToken
                } while(paginationToken);

                return {
                    statusCode: 200,
                    body: JSON.stringify("reminder emails sent")
                };
            }
        }
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify("reminder emails not sent out today")
    };
};

async function notifyUsers(round, kickoffTime, destinations) {
    const bulkTemplatedEmail = {
        "Source": "Super Leigh ! <superleigh@rocsolidservices.co.uk>",
        "Template": "Matchday",
        "ConfigurationSetName": "SuperLeigh",
        "Destinations": destinations,
        "DefaultTemplateData": JSON.stringify({
            "username": "Friend",
            "home_team": round.homeTeam.name,
            "away_team": round.awayTeam.name,
            "ground": round.ground,
            "kickOff": ("0" + kickoffTime.getHours()).slice(-2) + ":" + ("0" + kickoffTime.getMinutes()).slice(-2)
        })
    }
    console.log(JSON.stringify(bulkTemplatedEmail));

    const sentEmails = await sesClient.send(new SendBulkTemplatedEmailCommand(bulkTemplatedEmail));
    console.log(`sent email response: `, sentEmails);
}

function getLastSunday(year, month) {
    // Create date for last day in month
    var date = new Date(year, month, 0);
    // Adjust to previous Sunday
    date.setDate(date.getDate() - date.getDay());
    return date;
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