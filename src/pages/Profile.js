import React, { Component } from 'react';
import {Box, Typography} from '@material-ui/core';
import {AmplifyAuthenticator, withAuthenticator} from "@aws-amplify/ui-react";
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

export default function Profile() {
    const classes = useStyles();

    return (
        <AmplifyAuthenticator>
            <Box className={classes.root}>
                <Typography className={classes.title} variant={"h2"} color={"primary"}>Profile</Typography>
            </Box>
        </AmplifyAuthenticator>
    );
}