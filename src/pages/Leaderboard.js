import React from 'react';
import {Box, Typography} from '@material-ui/core';
import {AmplifyAuthenticator} from "@aws-amplify/ui-react";
import {makeStyles} from "@material-ui/core/styles";

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

export default function LeaderBoard() {
    const classes = useStyles();

    return (
        <AmplifyAuthenticator>
            <Box className={classes.root}>
                <Typography className={classes.title} variant={"h2"} color={"primary"}>LEADERBOARD</Typography>
            </Box>
        </AmplifyAuthenticator>
    );
}