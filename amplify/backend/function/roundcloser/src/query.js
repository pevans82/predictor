module.exports = {
    activeRoundQuery: `query roundByStatus {
      roundByStatus(sortDirection: ASC, limit: 1, status: active) {
        items {
          id
          kickOff
        }
      }
    }`,
    closeRoundMutation: `mutation updateRound($id: ID!) {
      updateRound(input: {id: $id, status: closed}) {
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
        updatedAt
      }
    }`
}