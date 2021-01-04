/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote {
    onCreateNote {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote {
    onUpdateNote {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote {
    onDeleteNote {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onCreateRound = /* GraphQL */ `
  subscription OnCreateRound {
    onCreateRound {
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
export const onUpdateRound = /* GraphQL */ `
  subscription OnUpdateRound {
    onUpdateRound {
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
export const onDeleteRound = /* GraphQL */ `
  subscription OnDeleteRound {
    onDeleteRound {
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
export const onCreateTeam = /* GraphQL */ `
  subscription OnCreateTeam {
    onCreateTeam {
      id
      name
      badge
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
      badge
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
      badge
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePrediction = /* GraphQL */ `
  subscription OnCreatePrediction {
    onCreatePrediction {
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
export const onUpdatePrediction = /* GraphQL */ `
  subscription OnUpdatePrediction {
    onUpdatePrediction {
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
export const onDeletePrediction = /* GraphQL */ `
  subscription OnDeletePrediction {
    onDeletePrediction {
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
export const onCreateResult = /* GraphQL */ `
  subscription OnCreateResult {
    onCreateResult {
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
export const onUpdateResult = /* GraphQL */ `
  subscription OnUpdateResult {
    onUpdateResult {
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
export const onDeleteResult = /* GraphQL */ `
  subscription OnDeleteResult {
    onDeleteResult {
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
export const onCreateRanking = /* GraphQL */ `
  subscription OnCreateRanking {
    onCreateRanking {
      id
      username
      points
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateRanking = /* GraphQL */ `
  subscription OnUpdateRanking {
    onUpdateRanking {
      id
      username
      points
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteRanking = /* GraphQL */ `
  subscription OnDeleteRanking {
    onDeleteRanking {
      id
      username
      points
      createdAt
      updatedAt
    }
  }
`;
