import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Grid} from "@material-ui/core";
import TeamCard from "./TeamCard";
import Moment from 'react-moment';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 800,
        width: '100vw',
        margin: "auto",
    },
    head: {
        background: "linear-gradient(#BE1D2C, #FFF)",
        padding: theme.spacing(1),
        marginBottom: theme.spacing(3),
    },
    grow: {
        flexGrow: 1,
    },
}));

export default function Fixture(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.head}>
                <Grid container justify={"center"}>
                    <Grid item xs={5}>
                        <Typography gutterBottom variant="h6" color={"secondary"}>{props.round.homeTeam.ground}</Typography>
                    </Grid>
                    <Grid item xs={2}/>
                    <Grid item xs={5}>
                        <Typography gutterBottom variant="h6" color={"secondary"}>
                            <Moment format="ddd Do MMM YYYY HH:mm">{props.round.kickOff}</Moment>
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <Grid container justify={"center"}>
                <Grid item xs={5}>
                    <TeamCard name={props.round.homeTeam.name} badgeSrc={props.round.homeTeam.badgeSrc}/>
                </Grid>
                <Grid item xs={2} style={{marginTop: "100px"}}>
                    <Typography variant="h3" color={"primary"}>vs</Typography>
                </Grid>
                <Grid item xs={5}>
                    <TeamCard name={props.round.awayTeam.name} badgeSrc={props.round.awayTeam.badgeSrc}/>
                </Grid>
            </Grid>
        </div>
    );
}