/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPrediction = /* GraphQL */ `
  query GetPrediction($id: ID!) {
    getPrediction(id: $id) {
      id
      homeScore
      awayScore
      createdAt
      updatedAt
      round {
        id
        number
        kickOff
        status
        createdAt
        updatedAt
        homeTeam {
          id
          name
          badgeSrc
          ground
          createdAt
          updatedAt
        }
        awayTeam {
          id
          name
          badgeSrc
          ground
          createdAt
          updatedAt
        }
      }
      owner
    }
  }
`;
export const listPredictions = /* GraphQL */ `
  query ListPredictions(
    $filter: ModelPredictionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPredictions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        homeScore
        awayScore
        createdAt
        updatedAt
        round {
          id
          number
          kickOff
          status
          createdAt
          updatedAt
        }
        owner
      }
      nextToken
    }
  }
`;
export const listRounds = /* GraphQL */ `
  query ListRounds(
    $filter: ModelRoundFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRounds(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        number
        kickOff
        status
        createdAt
        updatedAt
        homeTeam {
          id
          name
          badgeSrc
          ground
          createdAt
          updatedAt
        }
        awayTeam {
          id
          name
          badgeSrc
          ground
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getRound = /* GraphQL */ `
  query GetRound($id: ID!) {
    getRound(id: $id) {
      id
      number
      kickOff
      status
      createdAt
      updatedAt
      homeTeam {
        id
        name
        badgeSrc
        ground
        createdAt
        updatedAt
      }
      awayTeam {
        id
        name
        badgeSrc
        ground
        createdAt
        updatedAt
      }
    }
  }
`;
export const getRoundByStatus = /* GraphQL */ `
  query GetRoundByStatus(
    $status: RoundStatus
    $sortDirection: ModelSortDirection
    $filter: ModelRoundFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getRoundByStatus(
      status: $status
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        number
        kickOff
        status
        createdAt
        updatedAt
        homeTeam {
          id
          name
          badgeSrc
          ground
          createdAt
          updatedAt
        }
        awayTeam {
          id
          name
          badgeSrc
          ground
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listTeams = /* GraphQL */ `
  query ListTeams(
    $filter: ModelTeamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        badgeSrc
        ground
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTeam = /* GraphQL */ `
  query GetTeam($id: ID!) {
    getTeam(id: $id) {
      id
      name
      badgeSrc
      ground
      createdAt
      updatedAt
    }
  }
`;
