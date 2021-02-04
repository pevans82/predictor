import React, {useEffect, useState} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ScoreField from './ScoreField'
import API from "@aws-amplify/api";
import * as mutations from "../graphql/mutations";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {predictionsByRound} from "../graphql/queries";
import {useUser} from "../hooks/useUser";
import {useRound} from "../hooks/useRound";

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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" direction="up" {...props} />;
}

export default function ScoreCard(props) {
    const classes = useStyles();
    const theme = useTheme();

    const user = useUser();
    const round = useRound();

    const [predictionId, setPredictionId] = useState(0)
    const [homeScore, setHomeScore] = useState(0);
    const [awayScore, setAwayScore] = useState(0);

    const [openSnackBar, setOpenSnackBar] = useState(false);

    useEffect(() => {
        if (!user) {
            setPredictionId(0)
        }
        fetchPrediction();
    }, [user, round]);

    async function fetchPrediction() {
        console.log("fetch preds called")
        if (user && round) {
            console.log("fetching preds for user: " + user.username + ", id: " + predictionId)
            const pred = await API.graphql({
                query: predictionsByRound,
                variables: {roundId: round.id},
                authMode: 'AMAZON_COGNITO_USER_POOLS'
            });
            if (pred.data.predictionsByRound.items.length < 1) {
                console.log("prediction id: 0")
                setPredictionId(0)
                setHomeScore(0)
                setAwayScore(0)
            } else {
                console.log("prediction id: " + pred.data.predictionsByRound.items[0].id)
                setPredictionId(pred.data.predictionsByRound.items[0].id)
                setHomeScore(pred.data.predictionsByRound.items[0].homeScore)
                setAwayScore(pred.data.predictionsByRound.items[0].awayScore)
            }
        }
    }

    const handleSubmit = (event) => {
        savePrediction();
        setOpenSnackBar(true);
        event.preventDefault();
    }

    async function savePrediction() {
        if (predictionId) {
            console.log("updating prediction")
            await API.graphql({
                query: mutations.updatePrediction,
                variables: {input: {id: predictionId, homeScore: homeScore, awayScore: awayScore}},
                authMode: 'AMAZON_COGNITO_USER_POOLS'
            });
        } else {
            console.log("creating prediction")
            const pred = await API.graphql({
                query: mutations.createPrediction,
                variables: {input: {roundId: round.id, homeScore: homeScore, awayScore: awayScore}},
                authMode: 'AMAZON_COGNITO_USER_POOLS'
            });
            setPredictionId(pred.data.createPrediction.id)
        }
    }

    const handleHomeScoreChange = (event) => {
        const value = event.target.value
        setHomeScore(!value ? "0" : value);
    };

    const handleAwayScoreChange = (event) => {
        const value = event.target.value
        setAwayScore(!value ? "0" : value);
    };

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
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
            {round && round.status === "active" &&
            <Button style={{marginTop: theme.spacing(5)}} fullWidth={true} variant="contained" type={"submit"} color="primary">Submit</Button>
            }
            <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleSnackBarClose}>
                <Alert onClose={handleSnackBarClose} severity="success">
                    Prediction successfully submitted!
                </Alert>
            </Snackbar>
        </form>
    );
}