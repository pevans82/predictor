export const fetchRoundByStatusQuery = `query roundByStatus($status: RoundStatus) {
  roundByStatus(status: $status, limit: 1) {
    items {
      awayTeam {
        name
        badgeSrc
      }
      homeTeam {
        name
        badgeSrc
      }
      id
      kickOff
      ground
      number
      status
    }
  }
}
`

export const fetchCompleteRoundsQuery = `query roundByStatus {
  roundByStatus(sortDirection: ASC, status: complete, filter: {season: {eq: 5}}) {
    items {
      id
      number
    }
  }
}
`

export const fetchResultsBySeasonQuery = `query resultsBySeason {
  resultsBySeason(season: 5) {
    items {
      id
      homeScore
      awayScore
      round {
        awayTeam {
          badgeSrc
          name
        }
        ground
        homeTeam {
          badgeSrc
          name
        }
        kickOff
        number
        status
        id
      }
    }
  }
}
`

export const fetchSeasonLeaderBoardByPointsQuery = `query seasonLeaderboardByPoints {
    seasonLeaderboardByPoints(sortDirection: DESC, season: 5) {
        items {
            points
            username
        }
    }
}`

export const fetchRoundLeaderBoardByPointsQuery = `query roundLeaderboardByPoints($roundId: ID!) {
    roundLeaderboardByPoints(sortDirection: DESC, roundId: $roundId) {
        items {
            points
            username
        }
    }
}`

export const fetchResultByRoundIdQuery = `query listResults($roundId: ID!) {
    listResults(filter: {roundId: {eq: $roundId}}) {
        items {
            id
            awayScore
            homeScore
        }
    }
}`

export const fetchFixturesQuery = `query roundByStatus {
  roundByStatus(sortDirection: ASC, status: pending) {
    items {
      awayTeam {
        id
        name
        badgeSrc
      }
      homeTeam {
        id
        name
        badgeSrc
      }
      id
      kickOff
      ground
    }
  }
}
`

export const fetchTeamsQuery = `query listTeams {
  listTeams {
    items {
      badgeSrc
      ground
      id
      name
    }
  }
}
`

export const fetchPreferencesQuery = `query listPreferences {
  listPreferences() {
    items {
      id
      homeScore
      awayScore
      round {
        awayTeam {
          badgeSrc
          name
        }
        ground
        homeTeam {
          badgeSrc
          name
        }
        kickOff
        number
        status
        id
      }
    }
  }
}
`