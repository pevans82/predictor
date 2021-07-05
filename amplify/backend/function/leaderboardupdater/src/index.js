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
const ses = new AWS.SES({ region: region});
const fetchPredictions = require('./query.js').predictionsQuery;
const createRoundForUser = require('./query.js').createRoundMutation;
const fetchSeasonForUser = require('./query.js').seasonUserQuery;
const createSeasonForUser = require('./query.js').createSeasonMutation;
const updateSeasonForUser = require('./query.js').updateSeasonMutation;
const fetchNextRound = require('./query.js').pendingRoundsQuery;
const updateRoundToActive = require('./query.js').activateRoundMutation;
const fetchPreferences = require('./query.js').preferencesQuery;
const fetchResults = require('./query.js').resultsQuery;

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

      const rounds = await callGraphqlApi(
          fetchNextRound,
          "roundByStatus",
          null);

      if (rounds.items.length > 0) {
        await activateRound(rounds.items[0].id, Number(event.Records[0].dynamodb.NewImage.number.N) +1);
      }

      await notifyUsers(event.Records[0].dynamodb.NewImage.id.S);

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

async function notifyUsers(roundId) {
  const users = await cognitoIdentityService.listUsers({UserPoolId: userPoolId, AttributesToGet: ['email']}).promise();
  const preferences = await callGraphqlApi(fetchPreferences,"listPreferences");
  const optOutUsers = preferences.items.filter(item => item.results == true).map(item => item.owner);
  const destinations = users.Users.filter(user => !optOutUsers.includes(user.Username)).map(function(user) {
    return { "Destination": { "ToAddresses": [ user.Attributes[0].Value ] }, "ReplacementTemplateData": JSON.stringify({ "username": user.Username }) }
  });

  const results = await callGraphqlApi(fetchResults, "getResult", {"roundId": roundId});

  const bulkTemplatedEmail = {
    "Source": "Super Leigh ! <superleigh@rocsolidservices.co.uk>",
    "Template": "Results",
    "ConfigurationSetName": "SuperLeigh",
    "Destinations": destinations,
    "DefaultTemplateData": JSON.stringify({ "username":"Friend",
      "home_team": results.items[0].round.homeTeam.name,
      "home_score": results.items[0].homeScore,
      "away_team": results.items[0].round.awayTeam.name,
      "away_score": results.items[0].awayScore })
  }
  console.log(JSON.stringify(bulkTemplatedEmail));

  const sentEmails = await ses.sendBulkTemplatedEmail(bulkTemplatedEmail).promise();
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
    username: prediction.owner
  });

  if (seasonRecord.items.length < 1) {
    return await callGraphqlApi(createSeasonForUser, "createSeasonLeaderboard", {
      season: 1,
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