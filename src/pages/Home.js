import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Box, Grid, Typography} from "@material-ui/core";
import HowToCard from "../components/HowToCard"

const styles = theme => ({
    primarySectionWrapper: {
        background: '#BE1D2C',
        width: "100%",
        margin: "auto",
    },
    section: {
        maxWidth: 1250,
        marginLeft: "auto",
        marginRight: "auto",
        padding: "2rem",
    },
    centurionWrapper: {
        maxWidth: 1000,
        margin: "auto",
    },
    centurion: {
        background: `url(centurions.jpg) no-repeat top`,
        backgroundSize: `cover`,
        paddingBottom: `70%`,
    },
    title: {
        fontWeight: "bolder",
        margin: "auto",
        maxWidth: 500,
    },
    textBlock: {
        maxWidth: 800,
        margin: "auto",
        padding: "1rem",
    },
});

class Home extends Component {

    render() {
        const {classes} = this.props;

        return (
            <Box>
                <div className={classes.primarySectionWrapper}>
                    <div className={classes.centurionWrapper}>
                        <div className={classes.centurion}/>
                    </div>
                </div>
                <div className={classes.section}>
                    Next round
                </div>
                <div className={classes.primarySectionWrapper}>
                <div className={classes.section}>
                    Need some other content to go here
                </div>
                </div>
                <div className={classes.section}>
                    <Typography className={classes.title} variant={"h2"} color={"primary"}>HOW TO PLAY?</Typography>
                    <Typography className={classes.textBlock} variant={"body1"}>
                        Leigh Centurions are back where they belong in the top flight of Rugby League. The other teams won't know what's hit them when
                        they come down to the Sports Village and the Cherry and White army come raining down on them. So to celebrate we've created a
                        fancy new web based version of Grandad's predictor game. Please play responsibly and remember, it's just for fun!
                    </Typography>
                    <Grid container justify={"center"} spacing={4}>
                        <Grid item xs={12} sm={6} md={3}>
                            <HowToCard title={"SIGN UP"} icon={"/plusIcon.png"}
                                       description={"Sign up and register to play. Don't worry, We'll not sell your data, we just want to make sure you're not a pie'ater in disguise."}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <HowToCard title={"PREDICT THE SCORE"} icon={"/questionIcon.png"}
                                       description={"Tell us what you think the score of Leigh Centurions' next fixture will be."}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <HowToCard title={"SUPPORT THE CENTURIONS!"} icon={"/swordIcon.png"}
                                       description={"Cheer the lads on and enjoy the game...no matter what the outcome."}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <HowToCard title={"CHECK THE LEADERBOARD"} icon={"/starIcon.png"}
                                       description={"After the results are in, we'll run your prediction through the fancy scoring system and update the leaderboard."}/>
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.primarySectionWrapper}>
                    <div className={classes.section}>
                        <Typography className={classes.title} variant={"h2"} color={"secondary"}>This is awesome, but what made us do it?</Typography>
                        <Typography className={classes.textBlock} variant={"body1"} color={"secondary"}>
                            Grandad liked predicting the results of his beloved Leigh Centurions, and although he played with some of his buddies, he
                            thought the scoring was wack so he decided to run his own. Not knowing where or how to begin he reached out to rocSOLID
                            Services Ltd. After a brief (and gratis) consultation, he was given a fancy spreadsheet capable of tracking and scoring
                            everyone's predictions. It's ok, we thought, we've made it fool proof, we thought! ...call after call of, it's not
                            working...,
                            I've done something to it... and how do I change this... drove us to despair and so we created this incredible web based
                            application so that he can't break things anymore. If you have any idea's for improvement, <s>please keep them to
                            yourself</s> you can raise them with Grandad personally. Please play responsibly and remember...it's just a bit of fun!
                        </Typography>
                    </div>
                </div>
            </Box>
        );
    }
}

export default withStyles(styles)(Home)