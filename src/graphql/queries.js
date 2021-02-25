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
    $kickOff: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRoundFilterInput
    $limit: Int
    $nextToken: String
  ) {
    roundByStatus(
      status: $status
      kickOff: $kickOff
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
export const getRoundLeaderboard = /* GraphQL */ `
  query GetRoundLeaderboard($id: ID!) {
    getRoundLeaderboard(id: $id) {
      id
      roundId
      username
      points
      createdAt
      updatedAt
    }
  }
`;
export const listRoundLeaderboards = /* GraphQL */ `
  query ListRoundLeaderboards(
    $filter: ModelRoundLeaderboardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRoundLeaderboards(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        roundId
        username
        points
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const roundLeaderboardByPoints = /* GraphQL */ `
  query RoundLeaderboardByPoints(
    $roundId: ID
    $points: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRoundLeaderboardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    roundLeaderboardByPoints(
      roundId: $roundId
      points: $points
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        roundId
        username
        points
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSeasonLeaderboard = /* GraphQL */ `
  query GetSeasonLeaderboard($id: ID!) {
    getSeasonLeaderboard(id: $id) {
      id
      season
      username
      points
      createdAt
      updatedAt
    }
  }
`;
export const listSeasonLeaderboards = /* GraphQL */ `
  query ListSeasonLeaderboards(
    $filter: ModelSeasonLeaderboardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSeasonLeaderboards(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        season
        username
        points
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const seasonLeaderboardByPoints = /* GraphQL */ `
  query SeasonLeaderboardByPoints(
    $season: Int
    $points: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSeasonLeaderboardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    seasonLeaderboardByPoints(
      season: $season
      points: $points
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        season
        username
        points
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
