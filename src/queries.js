export const getCurrentRound = `query getCurrentRound {
    getRoundByStatus(limit: 1, status: active) {
        items {
            awayTeam {
                badgeSrc
                name
            }
            homeTeam {
                badgeSrc
                ground
                name
            }
            number
            kickOff
            status
        }
    }
}`

export const initialRoundState = {
    awayTeam: {
        badgeSrc: "",
        name: "",
    },
    homeTeam: {
        badgeSrc: "",
        ground: "",
        name: "",
    },
    number: 0,
    kickOff: "",
    status: ""}