module.exports = {
    fetchPredictionsQuery: `query fetchPredictions($roundId) {
        predictionsByRound(roundId: $roundId) {
            items {
                awayScore
                homeScore
                id
            }
        }
    }
    `
}