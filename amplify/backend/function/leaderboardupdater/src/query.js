module.exports = {
    predictionsQuery: `query predictionsByRound($roundId:ID!) {
        predictionsByRound(roundId: $roundId) {
            items {
                roundId
                owner
                points
            }
        }
    }`,
    seasonUserQuery: `query seasonLeaderboardByPoints($username:String!) {
      seasonLeaderboardByPoints(season: 1, filter: {username: {eq: $username}}) {
        items {
          id
          points
          username
        }
      }
    }`,
    pendingRoundsQuery: `query roundByStatus {
      roundByStatus(sortDirection: ASC, status: pending) {
        items {
          id
          kickOff
        }
      }
    }`,
    createRoundMutation: `mutation createRoundLeaderboard($roundId: ID!, $username: String!, $points: Int!) {
        createRoundLeaderboard(input: {roundId: $roundId, username: $username, points: $points}) {
          id
        }
      }
    `,
    createSeasonMutation: `mutation createSeasonLeaderboard($season: Int!, $username: String!, $points: Int!) {
        createSeasonLeaderboard(input: {season: $season, username: $username, points: $points, }) {
          id
        }
      }
    `,
    updateSeasonMutation: `mutation updateSeasonLeaderboard($id: ID!, $points: Int!) {
        updateSeasonLeaderboard(input: {id: $id, points: $points}) {
          id
        }
      }
    `,
    activateRoundMutation: `mutation updateRound($id: ID!, $number: Int!) {
      updateRound(input: {id: $id, status: active, number: $number}) {
        id
        awayTeam {
          id
        }
        createdAt
        ground
        homeTeam {
          id
        }
        kickOff
        number
        status
        updatedAt
      }
    }`
}