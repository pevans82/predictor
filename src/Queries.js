export const fetchRoundByStatusQuery = `query fetchRoundByStatus($status: RoundStatus) {
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

export const fetchCompleteRoundsQuery = `query fetchCompleteRounds {
  roundByStatus(status: complete) {
    items {
      id
      number
    }
  }
}
`

export const fetchResultsQuery = `query fetchResults {
  listResults {
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
    seasonLeaderboardByPoints(sortDirection: DESC, season:1) {
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