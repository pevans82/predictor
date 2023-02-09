import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import ScoreField from './ScoreField'
import StaticScoreField from "./StaticScoreField";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 800,
        width: '100vw',
        margin: "auto",
        marginBottom: theme.spacing(3),
    },
}));

export default function ScoreCard(props) {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className={classes.root}>
            <Grid style={{marginTop: theme.spacing(5)}} container justifyContent={"center"}>
                <Grid item xs={5}>
                    {props.isActive ?
                        <ScoreField id={props.id + "-homeScore"} label={props.label} value={props.homeScore} onChange={props.onHomeScoreChange}/>
                        :
                        <StaticScoreField value={props.homeScore}></StaticScoreField>
                    }
                </Grid>
                <Grid item xs={2}/>
                <Grid item xs={5}>
                    {props.isActive ?
                        <ScoreField id={props.id + "-awayScore"} label={props.label} value={props.awayScore} onChange={props.onAwayScoreChange}/>
                        :
                        <StaticScoreField value={props.awayScore}></StaticScoreField>
                    }
                </Grid>
            </Grid>
        </div>
    );
}