/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
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
      isCurrent
      isHome
      opponent {
        id
        name
        badge
        createdAt
        updatedAt
      }
      kickOff
      createdAt
      updatedAt
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
        isCurrent
        isHome
        opponent {
          id
          name
          badge
          createdAt
          updatedAt
        }
        kickOff
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
      badge
      createdAt
      updatedAt
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
        badge
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPrediction = /* GraphQL */ `
  query GetPrediction($id: ID!) {
    getPrediction(id: $id) {
      id
      username
      round {
        id
        number
        isCurrent
        isHome
        opponent {
          id
          name
          badge
          createdAt
          updatedAt
        }
        kickOff
        createdAt
        updatedAt
      }
      leighScore
      opponentScore
      createdAt
      updatedAt
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
        username
        round {
          id
          number
          isCurrent
          isHome
          kickOff
          createdAt
          updatedAt
        }
        leighScore
        opponentScore
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getResult = /* GraphQL */ `
  query GetResult($id: ID!) {
    getResult(id: $id) {
      id
      round {
        id
        number
        isCurrent
        isHome
        opponent {
          id
          name
          badge
          createdAt
          updatedAt
        }
        kickOff
        createdAt
        updatedAt
      }
      leighScore
      opponentScore
      createdAt
      updatedAt
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
        round {
          id
          number
          isCurrent
          isHome
          kickOff
          createdAt
          updatedAt
        }
        leighScore
        opponentScore
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRanking = /* GraphQL */ `
  query GetRanking($id: ID!) {
    getRanking(id: $id) {
      id
      username
      points
      createdAt
      updatedAt
    }
  }
`;
export const listRankings = /* GraphQL */ `
  query ListRankings(
    $filter: ModelRankingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRankings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        points
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
