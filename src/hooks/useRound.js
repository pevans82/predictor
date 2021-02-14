import {useEffect, useState} from 'react';
import {API, graphqlOperation} from "@aws-amplify/api";
import {onUpdateRound} from "../graphql/subscriptions";

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
        fetchCurrentRound();
    }, []);

    useEffect(() => {
        const updatedListener = assignUpdatedListener();

        return function cleanup() {
            updatedListener.unsubscribe();
        };
    }, [round]);

    async function fetchRound(status) {
        const result = await API.graphql({
            query: fetchRoundQuery,
            variables: {"status": status},
            authMode: 'API_KEY'
        });

        if (result.data.roundByStatus.items.length > 0) {
            return result.data.roundByStatus.items[0]
        }
    }

    async function fetchCurrentRound() {
        const activeRound = await fetchRound("active")
        if (activeRound) {
            setRound(activeRound)
        } else {
            const closedRound = await fetchRound("closed")
            setRound(closedRound)
        }
    }

    function assignUpdatedListener() {
        return API.graphql(graphqlOperation(onUpdateRound)).subscribe({
            next: (updated) => {
                const updatedRound = updated.value.data.onUpdateRound;
                if (round.id === updatedRound.id) {
                    setRound(updatedRound);
                }
            }
        });
    }

    return round;
}