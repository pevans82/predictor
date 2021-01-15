import React from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Grid, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    footerBar: {
        background: '#000',
    },
    footer: {
        width: '100%',
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
        <div className={classes.footerBar}>
        <div className={classes.footer}>
            <img className={classes.logo} src='centurionWhite.png'/>
            <Grid container justify={"center"} spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography align={"center"} gutterBottom color={"secondary"}>
                        About
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography align={"center"} gutterBottom color={"secondary"}>
                        Blog
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography align={"center"} gutterBottom color={"secondary"}>
                        Terms & Conditions
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography align={"center"} gutterBottom color={"secondary"}>
                        Contact us
                    </Typography>
                </Grid>
            </Grid>
            <Typography variant="caption" align={"center"} gutterBottom color={"secondary"} >
                ©rocSOLID Services Ltd All Rights Reserved
            </Typography>
        </div>
        </div>
    );
}