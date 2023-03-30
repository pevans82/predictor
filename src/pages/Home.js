import React, {useEffect, useState} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import HowToCard from "../components/HowToCard"
import leopards from "../images/leopards.png";
import Fixture from "../components/Fixture";
import {Link} from "react-router-dom";
import {PlayRoute} from "./Pages";
import Button from "@material-ui/core/Button";
import {useRound} from "../hooks/useRound";

const useStyles = makeStyles((theme) => ({
    primarySectionWrapper: {
        background: '#BE1D2C',
        width: "100vw",
        margin: "auto",
    },
    section: {
        maxWidth: 1000,
        margin: "auto",
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    logoWrapper: {
        maxWidth: 1000,
        margin: "auto",
    },
    logo: {
        background: `url(${leopards}) no-repeat top`,
        backgroundSize: `contain`,
        paddingBottom: `70%`,
    },
    title: {
        fontWeight: "bolder",
        margin: "auto",
        padding: theme.spacing(2),
        maxWidth: 500,
    },
    textBlock: {
        maxWidth: 500,
        margin: "auto",
        padding: theme.spacing(2),
    },
    noRound: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 400,
    },
}));

export default function Home() {
    const classes = useStyles();
    const theme = useTheme();
    const round = useRound();

    const [roundReady, setRoundReady] = useState();

    useEffect(() => {
        if (round) {
            setRoundReady(true);
        } else {
            setRoundReady(false);
        }
    }, [round]);

    return (
        <Box>
            <div className={classes.logoWrapper}>
                <div className={classes.logo}/>
            </div>
            <div style={{minHeight: 400}}>
                {roundReady && <div>
                    {round.id === 0 ? <div className={classes.noRound}>
                            <Typography className={classes.title} variant={"h2"} color={"primary"}>NEXT ROUND COMING SOON</Typography>
                    </div>
                        : <div>
                            {round.status === "active" &&
                            <Typography className={classes.title} variant={"h2"} color={"primary"}>Next Round</Typography>}
                            {round.status === "closed" &&
                            <Typography className={classes.title} variant={"h2"} color={"primary"}>Round in Play</Typography>}
                            <Typography gutterBottom variant="h5" color={"primary"}>Round {round.number}</Typography>
                            <Fixture round={round}/>
                            {round.status === "active" &&
                            <Button style={{margin: theme.spacing(5)}} size="large" component={Link} to={PlayRoute} variant="contained"
                                    color="primary">Predict
                                Now!</Button>}
                        </div>}
                </div>}
            </div>
            <div className={classes.primarySectionWrapper}>
                <div className={classes.section}>
                    <Typography className={classes.title} variant={"h2"} color={"secondary"}>SUPER LEIGH!</Typography>
                    <Typography className={classes.textBlock} variant={"body1"} color={"secondary"}>
                        Welcome to the rugby league prediction game dedicated to Leigh Rugby Football Club - for all the Leythers out there.
                    </Typography>
                    <Typography className={classes.textBlock} variant={"body1"} color={"secondary"}>
                        It's simple, just predict the outcome of Leigh's next fixture! The closer you are to the result, the more points
                        you'll score. Earn bonus points for predicting the winner and getting it spot on.
                    </Typography>
                    <Typography className={classes.textBlock} variant={"body1"} color={"secondary"}>
                        Please play responsibly and remember, it's just a bit of fun!
                    </Typography>
                </div>
            </div>
            <div className={classes.section}>
                <Typography className={classes.title} variant={"h2"} color={"primary"}>How to Play?</Typography>
                <Grid container justifyContent={"center"}>
                    <Grid item xs={12} sm={6} md={3}>
                        <HowToCard title={"SIGN UP"} icon={"account"}
                                   description={"Register to play and pit your wits against others to be crowned Leyther's greatest predictor."}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <HowToCard title={"PREDICT THE SCORE"} icon={"question"}
                                   description={"Tell us what you think the score of Leigh's next fixture will be."}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <HowToCard title={"SUPPORT THE LEOPARDS!"} icon={"rugby"}
                                   description={"Cheer the lads on and enjoy the game ...no matter what the outcome."}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <HowToCard title={"CHECK THE LEADERBOARD"} icon={"star"}
                                   description={"After the results are in, we'll score your prediction and update the leaderboard."}/>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.primarySectionWrapper}>
                <div className={classes.section}>
                    <Typography className={classes.title} variant={"h2"} color={"secondary"}>Origins</Typography>
                    <Typography className={classes.textBlock} variant={"body1"} color={"secondary"}>
                        There was a fan, lets call him <strong>Steve</strong>. He thinks he's great at predicting the results of his beloved Leigh,
                        but that wasn't enough. He needed to prove that he wasn't just good, but he was the best!
                    </Typography>
                    <Typography className={classes.textBlock} variant={"body1"} color={"secondary"}>
                        Not knowing where or how to begin he reached out and was given a fancy spreadsheet capable of tracking and scoring
                        predictions. With this, he challenged his family members.
                    </Typography>
                    <Typography className={classes.textBlock} variant={"body1"} color={"secondary"}>
                        It's ok, we thought, we've made it fool proof, we thought! ... call after call of, It's not working..., I've done
                        something to it... and, how do I do this... drove us to despair and so we decided to release it to the world and find
                        out once and for all, who really is the best!
                    </Typography>
                    <Typography className={classes.textBlock} variant={"body1"} color={"secondary"}>
                        If you have any idea's for improvement, please <s>keep them to
                        yourself</s> let us know, we'd love to here your thoughts.
                    </Typography>
                    <Typography className={classes.title} variant={"h6"} color={"secondary"}>In Loving Memory of:</Typography>
                    <Typography className={classes.title} variant={"h4"} color={"secondary"}>Steve Evans</Typography>
                    <Typography className={classes.title} variant={"h6"} color={"secondary"}>18/03/1954 - 16/03/2023</Typography>
                </div>
            </div>
        </Box>
    );
}