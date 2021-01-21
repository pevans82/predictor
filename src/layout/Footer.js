import React from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Grid, Typography} from "@material-ui/core";
import centurionWhite from '../images/centurionWhite.png'

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#000',
        width: '100%',
        margin: "auto",
    },
    footer: {
        maxWidth: 700,
        margin: "auto",
        textAlign: "center",
    },
    logo: {
        margin: "24px auto",
        width: 60,
    },
}));

export default function Footer() {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className={classes.root}>
            <div className={classes.footer}>
                <img className={classes.logo} src={centurionWhite} alt="Logo"/>
                <Grid container justify={"center"}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography align={"center"} gutterBottom color={"secondary"}>
                            About
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography align={"center"} gutterBottom color={"secondary"}>
                            Terms & Conditions
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography align={"center"} gutterBottom color={"secondary"}>
                            Privacy
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography align={"center"} gutterBottom color={"secondary"}>
                            Contact us
                        </Typography>
                    </Grid>
                </Grid>
                <Typography variant="caption" align={"center"} gutterBottom color={"secondary"}>
                    ©rocSOLID Services Ltd All Rights Reserved
                </Typography>
            </div>
        </div>
    );
}