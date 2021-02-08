
const fetchPredictionsQuery = gql`
    query fetchPredictions($roundId) {
        predictionsByRound(roundId: $roundId) {
            items {
                awayScore
                homeScore
                id
            }
        }
    }
`
