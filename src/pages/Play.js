import React, {useEffect, useState} from 'react';
import {Box, Typography, useTheme} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Fixture from "../components/Fixture";
import ScoreCard from "../components/ScoreCard";
import {activeRound} from "../queries";
import {API} from "@aws-amplify/api";
import {AmplifyAuthenticator} from "@aws-amplify/ui-react";
import * as queries from '../graphql/queries';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 800,
        margin: "auto",
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
    },
    title: {
        fontWeight: "bolder",
        margin: "auto",
        padding: theme.spacing(2),
        maxWidth: 500,
    },
}));

export default function Play() {
    const classes = useStyles();
    const theme = useTheme();

    const [round, setRound] = useState()
    const [prediction, setPrediction] = useState()

    useEffect(() => {
        fetchCurrentRound();
    }, []);

    async function fetchCurrentRound() {
        const active = await API.graphql({
            query: activeRound,
            authMode: 'API_KEY'
        });
        console.log("round data retreived")
        setRound(active.data.roundByStatus.items[0])

        fetchPrediction(active.data.roundByStatus.items[0].id);
    }

    async function fetchPrediction(roundId) {
        const pred = await API.graphql({
            query: queries.predictionsByRound,
            variables: {roundId: roundId},
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        });
        console.log(pred)
        if(pred.data.predictionsByRound.items.length < 1) {
            setPrediction({roundId: roundId, homeScore: 0, awayScore:0})
        } else {
            setPrediction(pred.data.predictionsByRound.items[0])
        }
    }

    return (
        <AmplifyAuthenticator>
            <Box className={classes.root}>
                {round && <Typography className={classes.title} variant={"h2"} color={"primary"}>ROUND {round.number}</Typography>}
                <Typography style={{textAlign: "left", margin: theme.spacing(1)}} gutterBottom variant="h5" color={"primary"}>Enter your
                    prediction</Typography>
                {round && <Fixture round={round}/>}
                <div className={classes.spaced}/>
                {prediction && <ScoreCard homeScore={prediction.homeScore}
                                          awayScore={prediction.awayScore}
                                          predictionId={prediction.id}
                                          roundId={prediction.roundId}/>}
            </Box>
        </AmplifyAuthenticator>
    );
}