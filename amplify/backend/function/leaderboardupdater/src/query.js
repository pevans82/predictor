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
    seasonUserQuery: `query seasonLeaderboardByPoints($season: Int!, $username:String!) {
      seasonLeaderboardByPoints(season: $season, filter: {username: {eq: $username}}) {
        items {
          id
          points
          username
        }
      }
    }`,
    pendingRoundsQuery: `query roundByStatus {
      roundByStatus(sortDirection: ASC, limit: 1, status: pending) {
        items {
          id
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
        createSeasonLeaderboard(input: {season: $season, username: $username, points: $points}) {
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
          badgeSrc
          createdAt
          ground
          name
          id
          updatedAt
        }
        createdAt
        ground
        homeTeam {
          id
          badgeSrc
          createdAt
          ground
          name
          id
          updatedAt
        }
        kickOff
        number
        status
        season
        updatedAt
      }
    }`,
    preferencesQuery: `query listPreferences {
        listPreferences {
            items {
                owner
                results
            }
        }
    }`,
    resultsQuery: `query listResults($roundId: ID!) {
      listResults(filter: {roundId: {eq: $roundId}}) {
        items {
          awayScore
          homeScore
          round {
            awayTeam {
              name
            }
            homeTeam {
              name
            }
          }
        }
      }
    }`
}