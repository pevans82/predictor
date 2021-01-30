/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePrediction = /* GraphQL */ `
  subscription OnCreatePrediction($owner: String) {
    onCreatePrediction(owner: $owner) {
      id
      roundId
      homeScore
      awayScore
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdatePrediction = /* GraphQL */ `
  subscription OnUpdatePrediction($owner: String) {
    onUpdatePrediction(owner: $owner) {
      id
      roundId
      homeScore
      awayScore
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeletePrediction = /* GraphQL */ `
  subscription OnDeletePrediction($owner: String) {
    onDeletePrediction(owner: $owner) {
      id
      roundId
      homeScore
      awayScore
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateRound = /* GraphQL */ `
  subscription OnCreateRound {
    onCreateRound {
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
export const onUpdateRound = /* GraphQL */ `
  subscription OnUpdateRound {
    onUpdateRound {
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
export const onDeleteRound = /* GraphQL */ `
  subscription OnDeleteRound {
    onDeleteRound {
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
export const onCreateTeam = /* GraphQL */ `
  subscription OnCreateTeam {
    onCreateTeam {
      id
      name
      badgeSrc
      ground
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTeam = /* GraphQL */ `
  subscription OnUpdateTeam {
    onUpdateTeam {
      id
      name
      badgeSrc
      ground
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTeam = /* GraphQL */ `
  subscription OnDeleteTeam {
    onDeleteTeam {
      id
      name
      badgeSrc
      ground
      createdAt
      updatedAt
    }
  }
`;
