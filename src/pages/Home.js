import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import HowToCard from "../components/HowToCard"
import centurions from "../images/centurions.jpg";
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
        maxWidth: 1250,
        margin: "auto",
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    centurionWrapper: {
        maxWidth: 1000,
        margin: "auto",
    },
    centurion: {
        background: `url(${centurions}) no-repeat top`,
        backgroundSize: `cover`,
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
}));

export default function Home() {
    const classes = useStyles();
    const theme = useTheme();
    const round = useRound();

    return (
        <Box>
            <div className={classes.primarySectionWrapper}>
                <div className={classes.centurionWrapper}>
                    <div className={classes.centurion}/>
                </div>
            </div>
            {!round && <Typography className={classes.title} variant={"h2"} color={"primary"}>NEXT ROUND COMING SOON</Typography>}
            {round && round.status === "active" && <Typography className={classes.title} variant={"h2"} color={"primary"}>NEXT ROUND</Typography>}
            {round && round.status === "closed" && <Typography className={classes.title} variant={"h2"} color={"primary"}>ROUND IN PLAY</Typography>}
            {round && <Typography gutterBottom variant="h5" color={"primary"}>Round {round.number}</Typography>}
            {round && <Fixture round={round}/>}
            {round && round.status === "active" &&
            <Button style={{margin: theme.spacing(5)}} size="large" component={Link} to={PlayRoute} variant="contained" color="primary">Predict
                Now!</Button>}
            <div className={classes.primarySectionWrapper}>
                <div className={classes.section}>
                    <Typography className={classes.title} variant={"h2"} color={"secondary"}>SUPER LEIGH!</Typography>
                    <Typography className={classes.textBlock} variant={"body1"} color={"secondary"}>
                        Leigh Centurions are back where they belong in the top flight of Rugby League. To celebrate we've created this new game
                        for all the Leythers out there.
                    </Typography>
                    <Typography className={classes.textBlock} variant={"body1"} color={"secondary"}>
                        It's simple, just predict the outcome of Leigh Centurions next fixture! The closer you are to the result, the more points
                        you'll score. Earn bonus points for predicting the winner and getting it spot on.
                    </Typography>
                    <Typography className={classes.textBlock} variant={"body1"} color={"secondary"}>
                        Please play responsibly and remember, it's just a bit of fun!
                    </Typography>
                </div>
            </div>
            <div className={classes.section}>
                <Typography className={classes.title} variant={"h2"} color={"primary"}>HOW TO PLAY?</Typography>
                <Grid container justify={"center"}>
                    <Grid item xs={12} sm={6} md={3}>
                        <HowToCard title={"SIGN UP"} icon={"account"}
                                   description={"Register to play and pit your wits against others to be crowned Leyther's greatest predictor."}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <HowToCard title={"PREDICT THE SCORE"} icon={"question"}
                                   description={"Tell us what you think the score of Leigh Centurions' next fixture will be."}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <HowToCard title={"SUPPORT THE CENTURIONS!"} icon={"rugby"}
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
                    <Typography className={classes.title} variant={"h2"} color={"secondary"}>ORIGINS</Typography>
                    <Typography className={classes.textBlock} variant={"body1"} color={"secondary"}>
                        There is a fan, lets call him <b>Steve</b>. He thinks he's great at predicting the results of his beloved Leigh Centurions,
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
                </div>
            </div>
        </Box>
    );
}