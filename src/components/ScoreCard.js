import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {Grid} from "@material-ui/core";
import ScoreField from "./ScoreField";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 800,
        width: '100vw',
        margin: "auto",
    },
    head: {
        display: "flex",
        background: "linear-gradient(#BE1D2C, #FFF)",

        marginBottom: theme.spacing(3),
    },
}));

export default function ScoreCard(props) {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <Grid container justify={"center"}>
                <Grid item xs={5}>
                    <ScoreField id={"home-score"} score={props.homeScore} />
                </Grid>
                <Grid item xs={2}/>
                <Grid item xs={5}>
                    <ScoreField id={"away-score"} score={props.awayScore}/>
                </Grid>
            </Grid>
        </form>
    );
}