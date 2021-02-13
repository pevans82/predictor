import { useState, useEffect } from 'react';
import {API} from "@aws-amplify/api";

const fetchRoundQuery = `query fetchRound($status: RoundStatus) {
  roundByStatus(status: $status, limit: 1) {
    items {
      awayTeam {
        name
        badgeSrc
      }
      homeTeam {
        name
        badgeSrc
      }
      id
      kickOff
      ground
      number
      status
    }
  }
}
`

export function useRound() {
    const [round, setRound] = useState()

    useEffect(() => {
        fetchCurrentRound()
    }, []);

    async function fetchRound(status) {
        const result = await API.graphql({
            query: fetchRoundQuery,
            variables: {"status": status},
            authMode: 'API_KEY'
        });

        if(result.data.roundByStatus.items.length > 0) {
            return result.data.roundByStatus.items[0]
        }
    }

    async function fetchCurrentRound() {
        const activeRound = await fetchRound("active")
        if(activeRound) {
            setRound(activeRound)
        } else {
            const closedRound = await fetchRound("closed")
            setRound(closedRound)
        }
    }

    return round;
}