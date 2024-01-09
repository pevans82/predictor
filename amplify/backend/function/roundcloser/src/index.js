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

const GRAPHQL_ENDPOINT = process.env.API_PREDICTIONSAPP_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || 'eu-west-1';

const fetchActiveRound = require('./query.js').activeRoundQuery;
const updateRoundToClosed = require('./query.js').closeRoundMutation;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
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