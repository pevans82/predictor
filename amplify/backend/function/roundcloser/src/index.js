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
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const fetchActiveRound = require('./query.js').activeRoundQuery;
const updateRoundToClosed = require('./query.js').closeRoundMutation;

exports.handler = async (event) => {
    //eslint-disable-line
    try {
        const rounds = await callGraphqlApi(
            fetchActiveRound, "roundByStatus");

        if (rounds.items.length > 0) {
            const nextRound = rounds.items[0];

            const now = new Date();
            const kickOff = new Date(nextRound.kickOff);

            if (kickOff <= now) {
                await callGraphqlApi(updateRoundToClosed, "updateRound", {id: nextRound.id});
            }
        }
        return {
            statusCode: 200,
            body: JSON.stringify("round closer complete")
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        };
    }
};

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