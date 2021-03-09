import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import centurionWhite from '../images/centurionWhite.png'
import Link from "@material-ui/core/Link";
import {AboutRoute, PrivacyRoute, TcAndCsRoute} from "../pages/Pages";
import format from 'date-fns/format';

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

    return (
        <div className={classes.root}>
            <div className={classes.footer}>
                <img className={classes.logo} src={centurionWhite} alt="Logo"/>
                <Grid container justify={"center"}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography align={"center"} gutterBottom color={"secondary"}>
                            <Link color={"secondary"} href={AboutRoute}>About</Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography align={"center"} gutterBottom color={"secondary"}>
                            <Link color={"secondary"} href={TcAndCsRoute}>Terms & Conditions</Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography align={"center"} gutterBottom color={"secondary"}>
                            <Link color={"secondary"} href={PrivacyRoute}>Privacy</Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography align={"center"} gutterBottom color={"secondary"}>
                             <Link color={"secondary"} href={"mailto:superleigh@rocsolidservices.co.uk"}>Contact us</Link>
                        </Typography>
                    </Grid>
                </Grid>
                <Typography variant="caption" align={"center"} gutterBottom color={"secondary"}>
                    ©rocSOLID Services Ltd {format(new Date(), 'yyyy')} - All Rights Reserved
                </Typography>
            </div>
        </div>
    );
}