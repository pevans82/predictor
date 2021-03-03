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
const fetchPredictions = require('./query.js').query;
const updatePrediction = require('./query.js').mutation;

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
        return 20;
    }

    const predictionDiff = predictionHome - predictionAway;
    const resultDiff = resultHome - resultAway;

    //10 points available dropping 1 point for every 2 points difference (round down if odd)
    let points = Math.floor(Math.max(0, 10 - (Math.abs(predictionDiff - resultDiff) / 2)));

    //5 bonus points for correct result
    if ((resultDiff < 0 && predictionDiff < 0)
        || (resultDiff == 0 && predictionDiff == 0)
        || (resultDiff > 0 && predictionDiff > 0)) {
        points += 5;
    }

    return points;
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