const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const {print} = graphql;

const fetchPredictionsQuery = gql`
    query fetchPredictions($roundId: ID) {
        predictionsByRound(roundId: $roundId) {
            items {
                awayScore
                homeScore
                id
            }
        }
    }
`

exports.handler = async (event) => {
    //eslint-disable-line
    console.log(JSON.stringify(event, null, 2));
    console.log(event.Records[0].eventName);

    try {
        //TODO: Get all predictions for round
        console.log("getting predictions for roundId")
        console.log(event.Records[0].dynamodb.NewImage.roundId)
        console.log(event.Records[0].dynamodb.NewImage.roundId.S)

        const graphqlData = await axios({
            url: process.env.API_predictionsapp_GraphQLAPIEndpointOutput,
            method: 'post',
            headers: {
                'x-api-key': process.env.API_predictionsapp_GRAPHQLAPIKEYOUTPUT
            },
            data: {
                query: print(fetchPredictionsQuery),
                variables: {"roundId": event.Records[0].dynamodb.NewImage.roundId.S},
            }
        });
        // const body = {
        //   graphqlData: graphqlData.data.predictionsByRound
        // }
        // return {
        //   statusCode: 200,
        //   body: JSON.stringify(body),
        //   headers: {
        //     "Access-Control-Allow-Origin": "*",
        //   }
        // }
        console.log("data retrieved...")
        console.log(graphqlData)
        //TODO: iterate predictions
        //TODO: score them based on rules - or set to ZERO if record.eventName === 'REMOVE'
        //TODO: updatePrediction with points scored

    } catch (err) {
        console.log('error posting to appsync: ', err);
    }

    return Promise.resolve('Successfully processed DynamoDB record');
};
