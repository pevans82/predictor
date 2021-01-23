import React, {Component} from 'react';
import {Box, Typography} from '@material-ui/core';
import {withAuthenticator} from '@aws-amplify/ui-react';
import {withStyles} from "@material-ui/core/styles";
import Fixture from "../components/Fixture";
import leigh from "../images/teams/leigh.png";
import wigan from "../images/teams/wigan.png";
import ScoreCard from "../components/ScoreCard";

const styles = theme => ({
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
});

class Play extends Component {
    render() {

        const {classes} = this.props;

        return (
            <Box className={classes.root}>
                <Typography className={classes.title} variant={"h2"} color={"primary"}>ROUND 1</Typography>
                <Typography style={{textAlign: "left"}} gutterBottom variant="h5" color={"primary"}>Enter your prediction</Typography>
                <Fixture ground={"Leigh Sports Village"} kickOff={"Fri 31st Mar 8:00pm"}
                         homeTeamName={"Leigh Centurions"} homeTeamBadge={leigh} awayTeamName={"Wigan Warriors"}
                         awayTeamBadge={wigan}/>
                <div className={classes.spaced}/>
                <ScoreCard homeScore={20} awayScore={10}/>
            </Box>
        );
    }
}

export default withAuthenticator(withStyles(styles)(Play), true);