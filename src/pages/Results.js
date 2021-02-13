import React, {useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import MobileStepper from '@material-ui/core/MobileStepper';
import {AmplifyAuthenticator} from '@aws-amplify/ui-react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Fixture from "../components/Fixture";
import ScoreCard from "../components/ScoreCard";
import API from "@aws-amplify/api";
import {predictionsByRound} from "../graphql/queries";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import StaticScoreField from "../components/StaticScoreField";

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

const fetchResultsQuery = `query fetchResultsWithRounds {
  listResults {
    items {
      homeScore
      awayScore
      round {
        awayTeam {
          badgeSrc
          name
        }
        ground
        homeTeam {
          badgeSrc
          name
        }
        kickOff
        number
        status
        id
      }
    }
  }
}
`

export default function Results() {
    const classes = useStyles();
    const theme = useTheme();

    const [results, setResults] = useState()

    const [activeStep, setActiveStep] = useState(0);
    const [maxSteps, setMaxSteps] = useState(0);

    const noPrediction = {homeScore: 0, awayScore: 0, points: 0};
    const [prediction, setPrediction] = useState(noPrediction);

    useEffect(() => {
        fetchResults();
    }, []);

    useEffect(() => {
        if(results) {
            fetchPrediction(results.length-1);
        }
    }, [results]);

    async function fetchResults() {
        console.log("fetchResults");
        const result = await API.graphql({
            query: fetchResultsQuery,
        });
        setResults(result.data.listResults.items);
        setMaxSteps(result.data.listResults.items.length);
        setActiveStep(result.data.listResults.items.length-1);
    }

    async function fetchPrediction(resultItemId) {
        const pred = await API.graphql({
            query: predictionsByRound,
            variables: {roundId: results[resultItemId].round.id},
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        });
        if (pred.data.predictionsByRound.items.length < 1) {
            setPrediction(noPrediction)
        } else {
            setPrediction(pred.data.predictionsByRound.items[0])
        }
    }

    const handlePrevious = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setPrediction(noPrediction);
        fetchPrediction(activeStep -1);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setPrediction(noPrediction);
        fetchPrediction(activeStep +1);
    };

    return (
        <AmplifyAuthenticator>
            <Box className={classes.root}>
                {maxSteps == 0 && <Typography className={classes.title} variant={"h2"} color={"primary"}>RESULTS</Typography>}
                {results && <div style={{marginBottom: theme.spacing(3)}}>
                    <Typography className={classes.title} variant={"h2"} color={"primary"}>ROUND {results[activeStep].round.number}</Typography>
                    <Typography className={classes.title} variant={"h4"} color={"primary"}>Points Scored</Typography>
                    <StaticScoreField id={"pts"} value={prediction.points}/>
                </div>
                }
                {maxSteps > 1 &&
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    variant="progress"
                    activeStep={activeStep}
                    backButton={
                        <Button size="small" onClick={handlePrevious} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        </Button>
                    }
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                />}
                <Paper square elevation={0} className={classes.header}>
                    {results &&
                        <div>
                            <Fixture round={results[activeStep].round}/>
                            <Typography className={classes.title} variant={"h4"} color={"primary"}>The Result</Typography>
                            <ScoreCard id={"results"} homeScore={results[activeStep].homeScore} awayScore={results[activeStep].awayScore}/>
                            <Typography className={classes.title} variant={"h4"} color={"primary"}>Your Prediction</Typography>
                            <ScoreCard id={"predictions"} homeScore={prediction.homeScore} awayScore={prediction.awayScore}/>
                        </div>
                    }
                </Paper>
            </Box>
        </AmplifyAuthenticator>
    );
}