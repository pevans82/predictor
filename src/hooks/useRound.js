import {useEffect, useState} from 'react';
import {API} from "@aws-amplify/api";
import {onUpdateRound} from "../graphql/subscriptions";
import {fetchRoundByStatusQuery} from "../Queries";

export function useRound() {
    const [round, setRound] = useState();

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
            query: fetchRoundByStatusQuery,
            variables: {status: status},
            authMode: 'API_KEY'
        });

        if (result.data.roundByStatus.items.length > 0) {
            return result.data.roundByStatus.items[0];
        }
    }

    async function fetchCurrentRound() {
        const activeRound = await fetchRound("active")
        if (activeRound) {
            setRound(activeRound);
        } else {
            const closedRound = await fetchRound("closed")
            if (closedRound) {
                setRound(closedRound);
            } else {
                setRound({id: 0});
            }
        }
    }

    function assignUpdatedListener() {
        return API.graphql({
            query: onUpdateRound,
            authMode: 'API_KEY'
        }).subscribe({
            next: (updated) => {
                const updatedRound = updated.value.data.onUpdateRound;

                if (round.id === updatedRound.id) {
                    if (updatedRound.status === "complete") {
                        setRound({id: 0});
                    } else {
                        setRound(updatedRound);
                    }
                } else {
                    if (updatedRound.status === "active") {
                        setRound(updatedRound);
                    }
                }
            }
        });
    }

    return round;
}