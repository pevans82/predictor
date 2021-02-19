/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRound = /* GraphQL */ `
  subscription OnCreateRound {
    onCreateRound {
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
export const onUpdateRound = /* GraphQL */ `
  subscription OnUpdateRound {
    onUpdateRound {
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
export const onDeleteRound = /* GraphQL */ `
  subscription OnDeleteRound {
    onDeleteRound {
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
export const onCreatePrediction = /* GraphQL */ `
  subscription OnCreatePrediction($owner: String) {
    onCreatePrediction(owner: $owner) {
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
export const onUpdatePrediction = /* GraphQL */ `
  subscription OnUpdatePrediction($owner: String) {
    onUpdatePrediction(owner: $owner) {
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
export const onDeletePrediction = /* GraphQL */ `
  subscription OnDeletePrediction($owner: String) {
    onDeletePrediction(owner: $owner) {
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
export const onCreateResult = /* GraphQL */ `
  subscription OnCreateResult {
    onCreateResult {
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
export const onUpdateResult = /* GraphQL */ `
  subscription OnUpdateResult {
    onUpdateResult {
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
export const onDeleteResult = /* GraphQL */ `
  subscription OnDeleteResult {
    onDeleteResult {
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
export const onCreateRoundLeaderboard = /* GraphQL */ `
  subscription OnCreateRoundLeaderboard {
    onCreateRoundLeaderboard {
      id
      roundId
      username
      points
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateRoundLeaderboard = /* GraphQL */ `
  subscription OnUpdateRoundLeaderboard {
    onUpdateRoundLeaderboard {
      id
      roundId
      username
      points
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteRoundLeaderboard = /* GraphQL */ `
  subscription OnDeleteRoundLeaderboard {
    onDeleteRoundLeaderboard {
      id
      roundId
      username
      points
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSeasonLeaderboard = /* GraphQL */ `
  subscription OnCreateSeasonLeaderboard {
    onCreateSeasonLeaderboard {
      id
      season
      username
      points
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSeasonLeaderboard = /* GraphQL */ `
  subscription OnUpdateSeasonLeaderboard {
    onUpdateSeasonLeaderboard {
      id
      season
      username
      points
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSeasonLeaderboard = /* GraphQL */ `
  subscription OnDeleteSeasonLeaderboard {
    onDeleteSeasonLeaderboard {
      id
      season
      username
      points
      createdAt
      updatedAt
    }
  }
`;
