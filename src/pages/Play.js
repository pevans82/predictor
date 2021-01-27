import React, {useEffect, useState} from 'react';
import {Box, Typography} from '@material-ui/core';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Fixture from "../components/Fixture";
import ScoreCard from "../components/ScoreCard";
import {getCurrentRound, initialRoundState} from "../queries";
import {API} from "@aws-amplify/api";
import {AmplifyAuthenticator} from "@aws-amplify/ui-react";

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

    const [round, setRound] = useState(initialRoundState)

    useEffect(() => {
        fetchCurrentRound();
    }, []);

    async function fetchCurrentRound() {
        const apiData = await API.graphql({query: getCurrentRound});
        setRound(apiData.data.getRoundByStatus.items[0])
    }

    return (
        <AmplifyAuthenticator>
            <Box className={classes.root}>
                <Typography className={classes.title} variant={"h2"} color={"primary"}>ROUND {round.number}</Typography>
                <Typography style={{textAlign: "left"}} gutterBottom variant="h5" color={"primary"}>Enter your prediction</Typography>
                <Fixture round={round}/>
                <div className={classes.spaced}/>
                <ScoreCard homeScore={20} awayScore={10}/>
            </Box>
        </AmplifyAuthenticator>
    );
}