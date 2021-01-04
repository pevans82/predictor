/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
      id
      name
      description
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
export const updateRound = /* GraphQL */ `
  mutation UpdateRound(
    $input: UpdateRoundInput!
    $condition: ModelRoundConditionInput
  ) {
    updateRound(input: $input, condition: $condition) {
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
export const deleteRound = /* GraphQL */ `
  mutation DeleteRound(
    $input: DeleteRoundInput!
    $condition: ModelRoundConditionInput
  ) {
    deleteRound(input: $input, condition: $condition) {
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
export const createTeam = /* GraphQL */ `
  mutation CreateTeam(
    $input: CreateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    createTeam(input: $input, condition: $condition) {
      id
      name
      badge
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
      badge
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
      badge
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
export const updatePrediction = /* GraphQL */ `
  mutation UpdatePrediction(
    $input: UpdatePredictionInput!
    $condition: ModelPredictionConditionInput
  ) {
    updatePrediction(input: $input, condition: $condition) {
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
export const deletePrediction = /* GraphQL */ `
  mutation DeletePrediction(
    $input: DeletePredictionInput!
    $condition: ModelPredictionConditionInput
  ) {
    deletePrediction(input: $input, condition: $condition) {
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
export const createResult = /* GraphQL */ `
  mutation CreateResult(
    $input: CreateResultInput!
    $condition: ModelResultConditionInput
  ) {
    createResult(input: $input, condition: $condition) {
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
export const updateResult = /* GraphQL */ `
  mutation UpdateResult(
    $input: UpdateResultInput!
    $condition: ModelResultConditionInput
  ) {
    updateResult(input: $input, condition: $condition) {
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
export const deleteResult = /* GraphQL */ `
  mutation DeleteResult(
    $input: DeleteResultInput!
    $condition: ModelResultConditionInput
  ) {
    deleteResult(input: $input, condition: $condition) {
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
export const createRanking = /* GraphQL */ `
  mutation CreateRanking(
    $input: CreateRankingInput!
    $condition: ModelRankingConditionInput
  ) {
    createRanking(input: $input, condition: $condition) {
      id
      username
      points
      createdAt
      updatedAt
    }
  }
`;
export const updateRanking = /* GraphQL */ `
  mutation UpdateRanking(
    $input: UpdateRankingInput!
    $condition: ModelRankingConditionInput
  ) {
    updateRanking(input: $input, condition: $condition) {
      id
      username
      points
      createdAt
      updatedAt
    }
  }
`;
export const deleteRanking = /* GraphQL */ `
  mutation DeleteRanking(
    $input: DeleteRankingInput!
    $condition: ModelRankingConditionInput
  ) {
    deleteRanking(input: $input, condition: $condition) {
      id
      username
      points
      createdAt
      updatedAt
    }
  }
`;
