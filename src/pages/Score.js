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
import API, {graphqlOperation} from "@aws-amplify/api";
import {fetchResultByRoundIdQuery} from "../Queries";
import * as mutations from "../graphql/mutations";
import MuiAlert from "@material-ui/lab/Alert";
import {useAdminUser} from "../hooks/useAdminUser";
import {onUpdateResult} from "../graphql/subscriptions";
import {ConfirmDialog} from "../components/ConfirmDialog";

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

export default function Score() {
    const classes = useStyles();
    const theme = useTheme();
    const round = useRound();
    const adminUser = useAdminUser();

    const [result, setResult] = useState();
    const [homeScore, setHomeScore] = useState(0);
    const [awayScore, setAwayScore] = useState(0);

    const [openSnackBar, setOpenSnackBar] = useState(false);

    const [openConfirm, setOpenConfirm] = useState(false);

    const [roundReady, setRoundReady] = useState();

    useEffect(() => {
        if (round) {
            setRoundReady(true);
        } else {
            setRoundReady(false);
        }

        fetchResult();
    }, [round]);

    useEffect(() => {
        const updatedListener = assignUpdatedListener();

        return function cleanup() {
            updatedListener.unsubscribe();
        };
    }, [result]);

    function assignUpdatedListener() {
        return API.graphql(graphqlOperation(onUpdateResult)).subscribe({
            next: (updated) => {
                const updatedResult = updated.value.data.onUpdateResult;
                if (result) {
                    if (result.id === updatedResult.id) {
                        setResult(updatedResult);
                        setHomeScore(updatedResult.homeScore);
                        setAwayScore(updatedResult.awayScore);
                    }
                }
            }
        });
    }

    async function fetchResult() {
        if (round && round.status === "closed") {
            const res = await API.graphql({
                query: fetchResultByRoundIdQuery,
                variables: {roundId: round.id},
                authMode: 'AMAZON_COGNITO_USER_POOLS'
            });
            if (res.data.listResults.items.length < 1) {
                console.log("no result for round");
                setResult(undefined);
                setHomeScore(0);
                setAwayScore(0);
            } else {
                console.log("result found for round");
                setResult(res.data.listResults.items[0]);
                setHomeScore(res.data.listResults.items[0].homeScore);
                setAwayScore(res.data.listResults.items[0].awayScore);
            }
        }
    }

    const handleSubmit = (event) => {
        saveResult();
        setOpenSnackBar(true);
        event.preventDefault();
    }

    async function saveResult() {
        if (result) {
            console.log("updating result");
            await API.graphql({
                query: mutations.updateResult,
                variables: {input: {id: result.id, roundId: round.id, homeScore: homeScore, awayScore: awayScore}},
                authMode: 'AMAZON_COGNITO_USER_POOLS'
            });
        } else {
            console.log("creating result");
            const res = await API.graphql({
                query: mutations.createResult,
                variables: {input: {roundId: round.id, homeScore: homeScore, awayScore: awayScore}},
                authMode: 'AMAZON_COGNITO_USER_POOLS'
            });
            setResult(res.data.createResult);
        }
    }

    async function completeRound() {
        console.log("round complete");
        await API.graphql({
            query: mutations.updateRound,
            variables: {input: {id: round.id, status: "complete"}},
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        });
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

    const handleComplete = (event) => {
        completeRound();
    }

    return (
        <AmplifyAuthenticator>
            <Box className={classes.root}>
                {adminUser ?
                    <div>
                        {roundReady && <div>
                            {round.id === 0 || round.status !== "closed" ? <div className={classes.noRound}>
                                    <Typography className={classes.title} variant={"h2"} color={"primary"}>No rounds in play</Typography>
                                </div>
                                : <div>
                                    {round.status === "closed" && <div>
                                        <Typography className={classes.title} variant={"h2"} color={"primary"}>Round {round.number}</Typography>
                                        <Typography style={{textAlign: "left", margin: theme.spacing(1)}} gutterBottom variant="h5" color={"primary"}>Enter
                                            the score</Typography>
                                        <Fixture round={round}/>
                                        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                                            <ScoreCard isActive={true} id={"score"} homeScore={homeScore} onHomeScoreChange={handleHomeScoreChange}
                                                       awayScore={awayScore} onAwayScoreChange={handleAwayScoreChange}/>
                                            <Button style={{marginTop: theme.spacing(5)}} fullWidth={true} variant="contained" type={"submit"}
                                                    color="primary">Save</Button>
                                            <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleSnackBarClose}>
                                                <Alert onClose={handleSnackBarClose} severity="success">
                                                    Scores successfully saved!
                                                </Alert>
                                            </Snackbar>
                                            <Button style={{marginTop: theme.spacing(5)}} fullWidth={true} variant="contained"
                                                    onClick={() => setOpenConfirm(true)} color="secondary">Complete</Button>
                                            <ConfirmDialog
                                            title="Complete the round?"
                                            open={openConfirm}
                                            setOpen={setOpenConfirm}
                                            onConfirm={handleComplete}
                                        >
                                            <Typography variant={"body1"}>Are you sure you want to complete the round?</Typography>
                                            <Typography variant={"body2"}>If these scores are wrong it will be a nightmare to sort
                                                out!</Typography>
                                        </ConfirmDialog>
                                        </form>
                                    </div>}
                                </div>}
                        </div>}
                    </div>
                    :
                    <div>
                        <Typography className={classes.title} variant={"h2"} color={"primary"}>! Naughty !</Typography>
                        <Typography className={classes.title} variant={"h4"}>You're not allowed to be here.</Typography>
                    </div>}
            </Box>
        </AmplifyAuthenticator>
    );
}