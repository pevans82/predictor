import React, {useState} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ScoreField from './ScoreField'

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

    const [homeScore, setHomeScore] = useState(props.homeScore);
    const [awayScore, setAwayScore] = useState(props.awayScore);

    const handleSubmit = (event) => {
        alert('Predication submitted: ' + homeScore + ' - ' + awayScore);
        event.preventDefault();
    }

    const handleHomeScoreChange = (event) => {
        setHomeScore(event.target.value);
    };

    const handleAwayScoreChange = (event) => {
        setAwayScore(event.target.value);
    };

    return (

        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid style={{marginTop: theme.spacing(5)}} container justify={"center"}>
                <Grid item xs={5}>
                    <ScoreField id={"homeScore"} value={homeScore} onChange={handleHomeScoreChange}/>
                </Grid>
                <Grid item xs={2}/>
                <Grid item xs={5}>
                    <ScoreField id={"awayScore"} value={awayScore} onChange={handleAwayScoreChange}/>
                </Grid>
            </Grid>
            <Button style={{marginTop: theme.spacing(5)}} fullWidth={true} variant="contained" type={"submit"} color="primary">Submit</Button>
        </form>
    );
}