import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {AmplifyAuthenticator} from "@aws-amplify/ui-react";
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";
import {useAdminUser} from "../hooks/useAdminUser";

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

export default function Fixtures() {
    const classes = useStyles();
    const adminUser = useAdminUser();

    return (
        <AmplifyAuthenticator>
            <Box className={classes.root}>
            {adminUser ?
                <div>
                    <Typography className={classes.title} variant={"h2"} color={"primary"}>Fixtures</Typography>
                </div>
                :
                <div>
                    <Typography className={classes.title} variant={"h2"} color={"primary"}>! Naughty !</Typography>
                    <Typography variant={"body1"}>You're not allowed to be here.</Typography>
                </div>
                }
                </Box>
        </AmplifyAuthenticator>
    );
}