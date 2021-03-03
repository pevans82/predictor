/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const deleteSeasonLeaderboard = /* GraphQL */ `
  mutation DeleteSeasonLeaderboard(
    $input: DeleteSeasonLeaderboardInput!
    $condition: ModelSeasonLeaderboardConditionInput
  ) {
    deleteSeasonLeaderboard(input: $input, condition: $condition) {
      id
      season
      username
      points
      createdAt
      updatedAt
    }
  }
`;
export const createRound = /* GraphQL */ `
  mutation CreateRound(
    $input: CreateRoundInput!
    $condition: ModelRoundConditionInput
  ) {
    createRound(input: $input, condition: $condition) {
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
export const updateRound = /* GraphQL */ `
  mutation UpdateRound(
    $input: UpdateRoundInput!
    $condition: ModelRoundConditionInput
  ) {
    updateRound(input: $input, condition: $condition) {
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
export const deleteRound = /* GraphQL */ `
  mutation DeleteRound(
    $input: DeleteRoundInput!
    $condition: ModelRoundConditionInput
  ) {
    deleteRound(input: $input, condition: $condition) {
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
export const createTeam = /* GraphQL */ `
  mutation CreateTeam(
    $input: CreateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    createTeam(input: $input, condition: $condition) {
      id
      name
      badgeSrc
      ground
      createdAt
      updatedAt
    }
  }
`;
export const updateTeam = /* GraphQL */ `
  mutation UpdateTeam(
    $input: UpdateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    updateTeam(input: $input, condition: $condition) {
      id
      name
      badgeSrc
      ground
      createdAt
      updatedAt
    }
  }
`;
export const deleteTeam = /* GraphQL */ `
  mutation DeleteTeam(
    $input: DeleteTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    deleteTeam(input: $input, condition: $condition) {
      id
      name
      badgeSrc
      ground
      createdAt
      updatedAt
    }
  }
`;
export const createPrediction = /* GraphQL */ `
  mutation CreatePrediction(
    $input: CreatePredictionInput!
    $condition: ModelPredictionConditionInput
  ) {
    createPrediction(input: $input, condition: $condition) {
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
export const updatePrediction = /* GraphQL */ `
  mutation UpdatePrediction(
    $input: UpdatePredictionInput!
    $condition: ModelPredictionConditionInput
  ) {
    updatePrediction(input: $input, condition: $condition) {
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
export const deletePrediction = /* GraphQL */ `
  mutation DeletePrediction(
    $input: DeletePredictionInput!
    $condition: ModelPredictionConditionInput
  ) {
    deletePrediction(input: $input, condition: $condition) {
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
export const createResult = /* GraphQL */ `
  mutation CreateResult(
    $input: CreateResultInput!
    $condition: ModelResultConditionInput
  ) {
    createResult(input: $input, condition: $condition) {
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
export const updateResult = /* GraphQL */ `
  mutation UpdateResult(
    $input: UpdateResultInput!
    $condition: ModelResultConditionInput
  ) {
    updateResult(input: $input, condition: $condition) {
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
export const deleteResult = /* GraphQL */ `
  mutation DeleteResult(
    $input: DeleteResultInput!
    $condition: ModelResultConditionInput
  ) {
    deleteResult(input: $input, condition: $condition) {
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
export const createRoundLeaderboard = /* GraphQL */ `
  mutation CreateRoundLeaderboard(
    $input: CreateRoundLeaderboardInput!
    $condition: ModelRoundLeaderboardConditionInput
  ) {
    createRoundLeaderboard(input: $input, condition: $condition) {
      id
      roundId
      username
      points
      createdAt
      updatedAt
    }
  }
`;
export const updateRoundLeaderboard = /* GraphQL */ `
  mutation UpdateRoundLeaderboard(
    $input: UpdateRoundLeaderboardInput!
    $condition: ModelRoundLeaderboardConditionInput
  ) {
    updateRoundLeaderboard(input: $input, condition: $condition) {
      id
      roundId
      username
      points
      createdAt
      updatedAt
    }
  }
`;
export const deleteRoundLeaderboard = /* GraphQL */ `
  mutation DeleteRoundLeaderboard(
    $input: DeleteRoundLeaderboardInput!
    $condition: ModelRoundLeaderboardConditionInput
  ) {
    deleteRoundLeaderboard(input: $input, condition: $condition) {
      id
      roundId
      username
      points
      createdAt
      updatedAt
    }
  }
`;
export const createSeasonLeaderboard = /* GraphQL */ `
  mutation CreateSeasonLeaderboard(
    $input: CreateSeasonLeaderboardInput!
    $condition: ModelSeasonLeaderboardConditionInput
  ) {
    createSeasonLeaderboard(input: $input, condition: $condition) {
      id
      season
      username
      points
      createdAt
      updatedAt
    }
  }
`;
export const updateSeasonLeaderboard = /* GraphQL */ `
  mutation UpdateSeasonLeaderboard(
    $input: UpdateSeasonLeaderboardInput!
    $condition: ModelSeasonLeaderboardConditionInput
  ) {
    updateSeasonLeaderboard(input: $input, condition: $condition) {
      id
      season
      username
      points
      createdAt
      updatedAt
    }
  }
`;
