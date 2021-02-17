module.exports = {
    query: `query predictionsByRound($roundId:ID!) {
        predictionsByRound(roundId: $roundId) {
            items {
                awayScore
                homeScore
                id
            }
        }
    }`,
    mutation: `mutation updatePrediction($id: ID!, $points: Int!) {
      updatePrediction(input: {id: $id, points: $points}) {
          id
          roundId
          homeScore
          awayScore
          points
          createdAt
          updatedAt
          owner
        }
      }
    `
}