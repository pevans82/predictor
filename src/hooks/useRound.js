import { useState, useEffect } from 'react';
import {API} from "@aws-amplify/api";
import {activeRound} from "../queries";

export function useRound() {
    const [round, setRound] = useState()

    useEffect(() => {
        fetchCurrentRound()
    }, []);

    async function fetchCurrentRound() {
        const active = await API.graphql({
            query: activeRound,
            authMode: 'API_KEY'
        });
        console.log("round retrieved...")
        console.log(active)
        setRound(active.data.roundByStatus.items[0])
        // if (activeRound) {
        //     console.log("returning active round")
        //     setRound(activeRound.data.roundByStatus.items[0])
        // }
        //
        // console.log("getting inPlay round")
        // const inPlayRound = await API.graphql({
        //     query: inPlayRound,
        //     authMode: 'API_KEY'
        // });
        // console.log(inPlayRound)
        // setRound(inPlayRound.data.roundByStatus.items[0])
    }

    return round;
}