import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Grid} from "@material-ui/core";
import TeamCard from "./TeamCard";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {PlayRoute} from "../pages/Pages";

const useStyles = makeStyles({
    root: {
        maxWidth: 800,
        width: '100vw',
        margin: "auto",
    },
    head: {
        display: "flex",
        background: '#BE1D2C',
    },
    grow: {
        flexGrow: 1,
    },
});

export default function Round(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography style={{textAlign: "left"}} gutterBottom variant="h5" color={"primary"}>Round {props.round}</Typography>
            <div className={classes.head}>
                <Typography gutterBottom style={{margin: "1rem"}} variant="h6" color={"secondary"}>{props.location}</Typography>
                <div className={classes.grow}></div>
                <Typography gutterBottom style={{margin: "1rem"}} variant="h6" color={"secondary"}>{props.kickOff}</Typography>
            </div>
            <Grid container justify={"center"}>
                <Grid item xs={5}>
                    <TeamCard name={props.homeTeamName} badge={props.homeTeamBadge}/>
                </Grid>
                <Grid item xs={2} style={{marginTop: "2rem"}}>
                    <Typography variant="h3" color={"primary"}>vs</Typography>
                </Grid>
                <Grid item xs={5}>
                    <TeamCard name={props.awayTeamName} badge={props.awayTeamBadge}/>
                </Grid>
            </Grid>
            <Button style={{margin: "1rem"}} size="large" component={Link} to={PlayRoute} variant="contained" color="primary">Predict Now!</Button>
        </div>
    );
}