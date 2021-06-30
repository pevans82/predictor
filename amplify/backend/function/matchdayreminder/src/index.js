/* Amplify Params - DO NOT EDIT
	API_PREDICTIONSAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_PREDICTIONSAPP_GRAPHQLAPIIDOUTPUT
	API_PREDICTIONSAPP_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const https = require('https');
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const appsyncUrl = process.env.API_PREDICTIONSAPP_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const userPoolId = process.env.COGNITO_USERPOOLID;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const cognitoIdentityService = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-19', region: region});
const ses = new AWS.SES({region: region});
const fetchActiveRound = require('./query.js').activeRoundQuery;
const fetchPreferences = require('./query.js').preferencesQuery;

exports.handler = async (event) => {
    //eslint-disable-line
    try {
        const rounds = await callGraphqlApi(fetchActiveRound, "roundByStatus");

        if (rounds.items.length > 0) {
            const round = rounds.items[0];

            const tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0,0,0,0);

            const matchday = new Date(round.kickOff);
            matchday.setHours(0,0,0,0);

            if (tomorrow.getTime() === matchday.getTime()) {
                const users = await cognitoIdentityService.listUsers({UserPoolId: userPoolId, AttributesToGet: ['email']}).promise();
                const preferences = await callGraphqlApi(fetchPreferences, "listPreferences");
                const optOutUsers = preferences.items.filter(item => item.matchday == true).map(item => item.owner);
                const destinations = users.Users.filter(user => !optOutUsers.includes(user.Username)).map(function (user) {
                    return {
                        "Destination": {"ToAddresses": [user.Attributes[0].Value]},
                        "ReplacementTemplateData": JSON.stringify({"username": user.Username})
                    }
                });

                const kickoffTime = new Date(round.kickOff);
                const bstStart = getLastSunday(kickoffTime.getFullYear(), 3);
                const bstEnd = getLastSunday(kickoffTime.getFullYear(), 10);
                //add hour if in BST
                if (kickoffTime > bstStart && kickoffTime < bstEnd) {
                    kickoffTime.setHours(kickoffTime.getHours() + 1);
                }

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
                        "kickOff": ("0" + kickoffTime.getHours()).slice (-2)+":"+("0" + kickoffTime.getMinutes()).slice (-2)
                    })
                }
                console.log(JSON.stringify(bulkTemplatedEmail));

                const sentEmails = await ses.sendBulkTemplatedEmail(bulkTemplatedEmail).promise();
                console.log(sentEmails);
                
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

function getLastSunday(year, month) {
    // Create date for last day in month
    var date = new Date(year, month, 0);
    // Adjust to previous Sunday
    date.setDate(date.getDate() - date.getDay());
    return date;
}

async function callGraphqlApi(query, operationName, variables) {
    const req = new AWS.HttpRequest(appsyncUrl, region);

    req.method = "POST";
    req.path = "/graphql";
    req.headers.host = endpoint;
    req.headers["Content-Type"] = "application/json";
    req.body = JSON.stringify({
        query,
        operationName,
        variables
    });

    const signer = new AWS.Signers.V4(req, "appsync", true);
    signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

    return await new Promise((resolve, reject) => {
        console.log(`making request for ${operationName}`);
        const httpRequest = https.request({...req, host: endpoint}, (result) => {
            result.on('data', (data) => {
                const response = JSON.parse(data.toString());
                if (response.errors) {
                    console.log(`Failed during ${operationName} query`);
                    console.log("Request body: ", req.body);
                    console.log(response.errors);
                    reject(null, `Failed during ${operationName} query`);
                }
                console.log(`response is: `, response.data[operationName]);
                resolve(response.data[operationName]);
            });
        });

        httpRequest.write(req.body);
        httpRequest.end();
    });
}