/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
        ground
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
      ground
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
export const roundByStatus = /* GraphQL */ `
  query RoundByStatus(
    $status: RoundStatus
    $sortDirection: ModelSortDirection
    $filter: ModelRoundFilterInput
    $limit: Int
    $nextToken: String
  ) {
    roundByStatus(
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
        ground
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
export const getPrediction = /* GraphQL */ `
  query GetPrediction($id: ID!) {
    getPrediction(id: $id) {
      id
      roundId
      homeScore
      awayScore
      points
      createdAt
      updatedAt
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
        roundId
        homeScore
        awayScore
        points
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const predictionsByRound = /* GraphQL */ `
  query PredictionsByRound(
    $roundId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelPredictionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    predictionsByRound(
      roundId: $roundId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        roundId
        homeScore
        awayScore
        points
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getResult = /* GraphQL */ `
  query GetResult($id: ID!) {
    getResult(id: $id) {
      id
      roundId
      homeScore
      awayScore
      createdAt
      updatedAt
      round {
        id
        number
        kickOff
        ground
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
  }
`;
export const listResults = /* GraphQL */ `
  query ListResults(
    $filter: ModelResultFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResults(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        roundId
        homeScore
        awayScore
        createdAt
        updatedAt
        round {
          id
          number
          kickOff
          ground
          status
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const resultsByRound = /* GraphQL */ `
  query ResultsByRound(
    $roundId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelResultFilterInput
    $limit: Int
    $nextToken: String
  ) {
    resultsByRound(
      roundId: $roundId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        roundId
        homeScore
        awayScore
        createdAt
        updatedAt
        round {
          id
          number
          kickOff
          ground
          status
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
