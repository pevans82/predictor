import React, {useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {AmplifyAuthenticator} from '@aws-amplify/ui-react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Fixture from "../components/Fixture";
import ScoreCard from "../components/ScoreCard";
import API, {graphqlOperation} from "@aws-amplify/api";
import {predictionsByRound} from "../graphql/queries";
import Paper from "@material-ui/core/Paper";
import StaticScoreField from "../components/StaticScoreField";
import {useUser} from "../hooks/useUser";
import Link from "@material-ui/core/Link";
import {onCreateResult, onUpdatePrediction, onUpdateResult} from "../graphql/subscriptions";
import ProgressStepper from "../components/ProgressStepper";
import {fetchResultsQuery} from "../Queries";

export const PlayRoute = "/play/";

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
}));

export default function Results() {
    const classes = useStyles();
    const theme = useTheme();
    const user = useUser();

    const [results, setResults] = useState()

    const [activeRound, setActiveRound] = useState(0);
    const [maxRounds, setMaxRounds] = useState();

    const noPrediction = {homeScore: "-", awayScore: "-", points: "0"};
    const [prediction, setPrediction] = useState(noPrediction);

    useEffect(() => {
        fetchResults(true);
    }, []);

    useEffect(() => {
        if (results) {
            setActiveRound(results.length - 1);
            fetchPrediction(results.length - 1);
        }
    }, [user]);

    useEffect(() => {
        if (results) {
            fetchPrediction(activeRound);
        }
    }, [results, activeRound]);

    useEffect(() => {
        const updatedListener = assignUpdatedListener();
        const createdListener = assignCreatedListener();

        return function cleanup() {
            updatedListener.unsubscribe();
            createdListener.unsubscribe();
        };
    }, [results]);

    useEffect(() => {
        if (user) {
            const predictionUpdatedListener = assignPredictionListener();

            return function cleanup() {
                predictionUpdatedListener.unsubscribe();
            };
        }
    }, [prediction]);

    function assignPredictionListener() {
        return API.graphql(graphqlOperation(onUpdatePrediction, {owner: user.username})).subscribe({
            next: (updated) => {
                const updatedResult = updated.value.data.onUpdatePrediction;
                if (updatedResult.id === prediction.id) {
                    setPrediction(updated.value.data.onUpdatePrediction);
                }
            }
        });
    }

    function assignUpdatedListener() {
        return API.graphql(graphqlOperation(onUpdateResult)).subscribe({
            next: (updated) => {
                const updatedResult = updated.value.data.onUpdateResult;
                setResults(
                    results.map(result => {
                        return result.id === updatedResult.id ? updatedResult : result;
                    }));
            }
        });
    }

    function assignCreatedListener() {
        return API.graphql(graphqlOperation(onCreateResult)).subscribe({
            next: (created) => {
                fetchResults(false);
            }
        });
    }

    async function fetchResults(resetActiveRound) {
        const result = await API.graphql(graphqlOperation(fetchResultsQuery));

        if (result.data.listResults.items.length > 0) {
            setResults(result.data.listResults.items.sort((a, b) => a.round.number - b.round.number));
            const roundsCount = result.data.listResults.items.length
            setMaxRounds(roundsCount);
            if (resetActiveRound) {
                setActiveRound(roundsCount - 1);
            }
        } else {
            setMaxRounds(0);
        }
    }

    async function fetchPrediction(resultIndex) {
        const pred = await API.graphql({
            query: predictionsByRound,
            variables: {roundId: results[resultIndex].round.id},
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        });
        if (pred.data.predictionsByRound.items.length < 1) {
            setPrediction(noPrediction)
        } else {
            setPrediction(pred.data.predictionsByRound.items[0])
        }
    }

    const handlePrevious = () => {
        setActiveRound((prevActiveRound) => prevActiveRound - 1);
        setPrediction(noPrediction);
    };

    const handleNext = () => {
        setActiveRound((prevActiveRound) => prevActiveRound + 1);
        setPrediction(noPrediction);
    };

    return (
        <AmplifyAuthenticator>
            <Box className={classes.root}>
                {maxRounds === 0 && <div>
                    <Typography className={classes.title} variant={"h2"} color={"primary"}>RESULTS</Typography>
                    <Typography className={classes.title} variant={"h4"} color={"primary"}>Hold fire eager beaver !</Typography>
                    <Typography className={classes.title} variant={"body1"} color={"primary"}>We've not even played Round 1 yet! Don't forget to have
                        a go and <Link href={PlayRoute} color="inherit">submit your predictions</Link> before the game starts otherwise you'll score a
                        big fat...</Typography>
                    <StaticScoreField value={0}></StaticScoreField>
                </div>
                }
                {results && <div style={{marginBottom: theme.spacing(3)}}>
                    <Typography className={classes.title} variant={"h2"} color={"primary"}>ROUND {results[activeRound].round.number}</Typography>
                    <Typography className={classes.title} variant={"h4"} color={"primary"}>Points Scored</Typography>
                    <StaticScoreField id={"pts"} value={prediction.points}/>
                </div>
                }
                {maxRounds > 1 && <ProgressStepper
                    onHandleNext={handleNext} onHandlePrevious={handlePrevious} maxSteps={maxRounds} activeStep={activeRound}/>}
                <Paper square elevation={0} className={classes.header}>
                    {results &&
                    <div>
                        <Fixture round={results[activeRound].round}/>
                        {results[activeRound].round.status === 'complete' ?
                            <Typography className={classes.title} variant={"h4"} color={"primary"}>Result</Typography>
                            :
                            <div>
                                <Typography className={classes.title} variant={"body1"} color={"primary"}>* Game still in play or confirming final
                                    score</Typography>
                                <Typography className={classes.title} variant={"h4"} color={"primary"}>Current Score</Typography>
                            </div>
                        }
                        <ScoreCard id={"results"} homeScore={results[activeRound].homeScore} awayScore={results[activeRound].awayScore}/>
                        <Typography className={classes.title} variant={"h4"} color={"primary"}>Prediction</Typography>
                        <ScoreCard id={"predictions"} homeScore={prediction.homeScore} awayScore={prediction.awayScore}/>
                    </div>
                    }
                </Paper>
            </Box>
        </AmplifyAuthenticator>
    );
}