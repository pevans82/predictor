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

const fetchPredictions = require('./query.js').query;
const updatePrediction = require('./query.js').mutation;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(JSON.stringify(event, null, 2));
    console.log(event.Records[0].eventName);

    try {
        if (event.Records[0].eventName === "REMOVE") {
            const predictions = await callGraphqlApi(
                fetchPredictions,
                "predictionsByRound",
                {"roundId": event.Records[0].dynamodb.OldImage.roundId.S});

            await wipePoints(predictions);
        } else {
            const predictions = await callGraphqlApi(
                fetchPredictions,
                "predictionsByRound",
                {"roundId": event.Records[0].dynamodb.NewImage.roundId.S});

            await applyPoints(predictions, event.Records[0].dynamodb.NewImage.homeScore.N, event.Records[0].dynamodb.NewImage.awayScore.N);
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
        body: JSON.stringify("prediction points applied")
    };

};

async function wipePoints(predictions) {
    return await Promise.all(predictions.items.map(prediction =>
        callGraphqlApi(updatePrediction, "updatePrediction", {
            id: prediction.id,
            points: 0
        })));
}

async function applyPoints(predictions, resultHome, resultAway) {
    return await Promise.all(predictions.items.map(prediction =>
        callGraphqlApi(updatePrediction, "updatePrediction", {
            id: prediction.id,
            points: pointsScored(resultHome, resultAway, prediction.homeScore, prediction.awayScore)
        })));
}

function pointsScored(resultHome, resultAway, predictionHome, predictionAway) {
    //max points for getting it spot on
    if (resultHome == predictionHome && resultAway == predictionAway) {
        return 25;
    }

    //10 points available for home and away score differences dropping 1 point for every 2 points difference (round down if odd)
    const homePoints = Math.floor(Math.max(0, 10 - (Math.abs(predictionHome - resultHome) / 2)));
    const awayPoints = Math.floor(Math.max(0, 10 - (Math.abs(predictionAway - resultAway) / 2)));

    //5 points available for overall result difference dropping 1 point for every 2 points difference (round down if odd)
    const predictionDiff = predictionHome - predictionAway
    const resultDiff = resultHome - resultAway
    const diffPoints = ((resultDiff < 0 && predictionDiff < 0)
        || (resultDiff === 0 && predictionDiff === 0)
        || (resultDiff > 0 && predictionDiff > 0))
        ? Math.floor(Math.max(0, 5 - (Math.abs(resultDiff - predictionDiff) / 2))) : 0

    return homePoints + awayPoints + diffPoints;
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