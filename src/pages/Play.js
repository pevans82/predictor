import React from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Fixture from "../components/Fixture";
import ScoreCard from "../components/ScoreCard";
import {AmplifyAuthenticator} from "@aws-amplify/ui-react";
import {useRound} from "../hooks/useRound";
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

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
    const round = useRound();

    return (
        <AmplifyAuthenticator>
            <Box className={classes.root}>
                {round && <Typography className={classes.title} variant={"h2"} color={"primary"}>ROUND {round.number}</Typography>}
                <Typography style={{textAlign: "left", margin: theme.spacing(1)}} gutterBottom variant="h5" color={"primary"}>Enter your
                    prediction</Typography>
                {round && <Fixture round={round}/>}
                <div className={classes.spaced}/>
                <ScoreCard />
            </Box>
        </AmplifyAuthenticator>
    );
}