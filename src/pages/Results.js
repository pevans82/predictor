import React, {useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
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
import {fetchResultsBySeasonQuery} from "../Queries";
import PointsBreakdown from "../components/PointsBreakdown";
import Authenticator from "../components/Authenticator";

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

    const [results, setResults] = useState();

    const [activeRound, setActiveRound] = useState();
    const [maxRounds, setMaxRounds] = useState();

    const noPrediction = {homeScore: "-", awayScore: "-", points: "0"};
    const [prediction, setPrediction] = useState(noPrediction);

    const [pointsBreakdown, setPointsBreakdown] = useState();

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
        if (results && activeRound !== undefined) {
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
        const result = await API.graphql(graphqlOperation(fetchResultsBySeasonQuery));

        if (result.data.resultsBySeason.items.length > 0) {
            setResults(result.data.resultsBySeason.items.sort((a, b) => a.round.number - b.round.number));
            const roundsCount = result.data.resultsBySeason.items.length;
            setMaxRounds(roundsCount);
            if (resetActiveRound || activeRound === undefined) {
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
            setPrediction(noPrediction);
            setPointsBreakdown(undefined);
        } else {
            setPrediction(pred.data.predictionsByRound.items[0]);

            const predictionHome = pred.data.predictionsByRound.items[0].homeScore
            const predictionAway = pred.data.predictionsByRound.items[0].awayScore

            const resultHome = results[activeRound].homeScore
            const resultAway = results[activeRound].awayScore

            const homeDiff = Math.abs(predictionHome - resultHome)
            const homePoints = Math.floor(Math.max(0, 10 - (homeDiff / 2)))

            const awayDiff = Math.abs(predictionAway - resultAway)
            const awayPoints = Math.floor(Math.max(0, 10 - (awayDiff / 2)))

            const predictionDiff = predictionHome - predictionAway
            const resultDiff = resultHome - resultAway
            const correctResult = ((resultDiff < 0 && predictionDiff < 0) || (resultDiff === 0 && predictionDiff === 0) || (resultDiff > 0 && predictionDiff > 0))

            const actualDiff = Math.abs(resultDiff - predictionDiff)
            const resultPoints = correctResult ? Math.floor(Math.max(0, 5 - (actualDiff / 2))) : 0

            setPointsBreakdown({homeDiff: homeDiff, homePoints: homePoints,
                awayDiff: awayDiff, awayPoints: awayPoints, correctResult: correctResult,
                resultDiff: actualDiff, resultPoints: resultPoints,
                total: homePoints + awayPoints + resultPoints});
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
        <Authenticator>
            <Box className={classes.root}>
                {maxRounds === 0 && <div>
                    <Typography className={classes.title} variant={"h2"} color={"primary"}>Results</Typography>
                    <Typography className={classes.title} variant={"h4"} color={"primary"}>Hold fire eager beaver !</Typography>
                    <Typography className={classes.title} variant={"body1"} color={"primary"}>We've not even played Round 1 yet! Don't forget to have
                        a go and <Link href={PlayRoute} color="inherit">enter your predictions</Link> before the game starts otherwise you'll score a
                        big fat...</Typography>
                    <StaticScoreField value={0}></StaticScoreField>
                </div>
                }
                {results && activeRound !== undefined && <div style={{marginBottom: theme.spacing(3)}}>
                    <Typography className={classes.title} variant={"h2"} color={"primary"}>Round {results[activeRound].round.number}</Typography>
                    <Typography className={classes.title} variant={"h4"} color={"primary"}>Points Scored</Typography>
                    <StaticScoreField id={"pts"} value={prediction.points}/>
                </div>
                }
                {maxRounds > 1 && activeRound !== undefined && <ProgressStepper
                    onHandleNext={handleNext} onHandlePrevious={handlePrevious} maxSteps={maxRounds} activeStep={activeRound}/>}
                <Paper square elevation={0} className={classes.header}>
                    {results && activeRound !== undefined &&
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
                        {pointsBreakdown && <PointsBreakdown homeDiff={pointsBreakdown.homeDiff} homePoints={pointsBreakdown.homePoints}
                                                             awayDiff={pointsBreakdown.awayDiff} awayPoints={pointsBreakdown.awayPoints}
                                                             correctResult={pointsBreakdown.correctResult} resultDiff={pointsBreakdown.resultDiff}
                                                             resultPoints={pointsBreakdown.resultPoints} total={pointsBreakdown.total}/>}
                    </div>
                    }
                </Paper>
            </Box>
        </Authenticator>
    );
}