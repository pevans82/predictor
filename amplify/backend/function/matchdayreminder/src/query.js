module.exports = {
    activeRoundQuery: `query roundByStatus {
      roundByStatus(sortDirection: ASC, limit: 1, status: active) {
        items {
          id
          awayTeam {
            name
          }
          homeTeam {
            name
          }
          ground
          kickOff
        }
      }
    }`,
    preferencesQuery: `query listPreferences {
        listPreferences {
            items {
                owner
                matchday
            }
        }
    }`
}