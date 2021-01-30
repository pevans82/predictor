export const activeRound = `query activeRound {
  roundByStatus(status: active, limit: 1) {
    items {
      awayTeam {
        name
        badgeSrc
      }
      homeTeam {
        name
        badgeSrc
        ground
      }
      id
      kickOff
      number
      status
    }
  }
}
`

export const inPlayRound = `query inPlayRound {
    roundByStatus(limit: 1, status: active) {
        items {
            awayTeam {
                badgeSrc
                name
            }
            homeTeam {
                badgeSrc
                ground
                name
            }
            id
            number
            kickOff
            status
        }
    }
}`

