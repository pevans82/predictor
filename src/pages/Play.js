import React, {useEffect, useState} from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Fixture from "../components/Fixture";
import ScoreCard from "../components/ScoreCard";
import {AmplifyAuthenticator} from "@aws-amplify/ui-react";
import {useRound} from "../hooks/useRound";
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import API from "@aws-amplify/api";
import {predictionsByRound} from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import {useUser} from "../hooks/useUser";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
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
    noRound: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 400,
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" direction="up" {...props} />;
}

export default function Play() {
    const classes = useStyles();
    const theme = useTheme();
    const user = useUser();
    const round = useRound();

    const [predictionId, setPredictionId] = useState(0);
    const [homeScore, setHomeScore] = useState(0);
    const [awayScore, setAwayScore] = useState(0);

    const [openSnackBar, setOpenSnackBar] = useState(false);

    const [roundReady, setRoundReady] = useState();

    useEffect(() => {
        if (round) {
            setRoundReady(true);
        } else {
            setRoundReady(false);
        }
    }, [round]);

    useEffect(() => {
        if (!user) {
            setPredictionId(0);
        }
        fetchPrediction();
    }, [user, round]);

    async function fetchPrediction() {
        if (user && round) {
            const pred = await API.graphql({
                query: predictionsByRound,
                variables: {roundId: round.id},
                authMode: 'AMAZON_COGNITO_USER_POOLS'
            });
            if (pred.data.predictionsByRound.items.length < 1) {
                setPredictionId(0);
                setHomeScore(0);
                setAwayScore(0);
            } else {
                setPredictionId(pred.data.predictionsByRound.items[0].id);
                setHomeScore(pred.data.predictionsByRound.items[0].homeScore);
                setAwayScore(pred.data.predictionsByRound.items[0].awayScore);
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
            await API.graphql({
                query: mutations.updatePrediction,
                variables: {input: {id: predictionId, homeScore: homeScore, awayScore: awayScore}},
                authMode: 'AMAZON_COGNITO_USER_POOLS'
            });
        } else {
            const pred = await API.graphql({
                query: mutations.createPrediction,
                variables: {input: {roundId: round.id, homeScore: homeScore, awayScore: awayScore}},
                authMode: 'AMAZON_COGNITO_USER_POOLS'
            });
            setPredictionId(pred.data.createPrediction.id);
        }
    }

    const handleHomeScoreChange = (event) => {
        const value = event.target.value;
        setHomeScore(!value ? "0" : value);
    };

    const handleAwayScoreChange = (event) => {
        const value = event.target.value;
        setAwayScore(!value ? "0" : value);
    };

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    return (
        <AmplifyAuthenticator>
            <Box className={classes.root}>
                {roundReady && <div>
                    {round.id === 0 ?
                        <div className={classes.noRound}><Typography className={classes.title} variant={"h2"} color={"primary"}>NEXT ROUND COMING SOON</Typography></div>
                        : <div>
                            <Typography className={classes.title} variant={"h2"} color={"primary"}>Round {round.number}</Typography>
                            {round.status === "active" &&
                            <Typography style={{textAlign: "left", margin: theme.spacing(1)}} gutterBottom variant="h5" color={"primary"}>Enter your
                                prediction</Typography>}
                            <Fixture round={round}/>
                            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                                <ScoreCard isActive={round.status === "active"} id={"play"} homeScore={homeScore}
                                           onHomeScoreChange={handleHomeScoreChange}
                                           awayScore={awayScore} onAwayScoreChange={handleAwayScoreChange}/>
                                {round.status === "active" &&
                                <Button style={{marginTop: theme.spacing(5)}} fullWidth={true} variant="contained" type={"submit"}
                                        color="primary">Submit</Button>
                                }
                                <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleSnackBarClose}>
                                    <Alert onClose={handleSnackBarClose} severity="success">
                                        Prediction successfully submitted!
                                    </Alert>
                                </Snackbar>
                            </form>
                        </div>}
                </div>}
            </Box>
        </AmplifyAuthenticator>
    );
}