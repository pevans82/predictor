import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Box, Grid, Typography} from "@material-ui/core";
import HowToCard from "../components/HowToCard"
import plusIcon from '../images/plusIcon.png'
import questionIcon from '../images/questionIcon.png'
import swordIcon from '../images/swordIcon.png'
import starIcon from '../images/starIcon.png'
import centurions from "../images/centurions.jpg";

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
        background: `url(${centurions}) no-repeat top`,
        backgroundSize: `cover`,
        paddingBottom: `70%`,
    },
    title: {
        fontWeight: "bolder",
        marginLeft: "auto",
        marginRight: "auto",
        margin: "1rem",
        maxWidth: 500,
    },
    textBlock: {
        maxWidth: 500,
        marginLeft: "auto",
        marginRight: "auto",
        margin: "1rem",
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
                        <Typography className={classes.title} variant={"h2"} color={"secondary"}>SUPER LEIGH!</Typography>
                        <Typography className={classes.textBlock} variant={"body1"} color={"secondary"}>
                            Leigh Centurions are back where they belong in the top flight of Rugby League. To celebrate we've created a fancy new
                            predictor game. Please play responsibly and remember, it's just a bit of fun!
                        </Typography>
                    </div>
                </div>
                <div className={classes.section}>
                    <Typography className={classes.title} variant={"h2"} color={"primary"}>HOW TO PLAY?</Typography>
                    <Grid container justify={"center"} spacing={4}>
                        <Grid item xs={12} sm={6} md={3}>
                            <HowToCard title={"SIGN UP"} icon={plusIcon}
                                       description={"Register to play and pit your wits against others to be crowned Leyther's greatest predictor."}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <HowToCard title={"PREDICT THE SCORE"} icon={questionIcon}
                                       description={"Tell us what you think the score of Leigh Centurions' next fixture will be."}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <HowToCard title={"SUPPORT THE CENTURIONS!"} icon={swordIcon}
                                       description={"Cheer the lads on and enjoy the game ...no matter what the outcome."}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <HowToCard title={"CHECK THE LEADERBOARD"} icon={starIcon}
                                       description={"After the results are in, we'll run your prediction through a fancy scoring system and update the leaderboard."}/>
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.primarySectionWrapper}>
                    <div className={classes.section}>
                        <Typography className={classes.title} variant={"h2"} color={"secondary"}>Origins</Typography>
                        <Typography className={classes.textBlock} variant={"body1"} color={"secondary"}>
                            There was a fan who thought he was great at predicting the results of his beloved Leigh Centurions, but that wasn't
                            enough, he needed to prove that he wasn't just good, but he was the best.
                        </Typography>
                        <Typography className={classes.textBlock} variant={"body1"} color={"secondary"}>
                            Not knowing where or how to begin he reached out and was given a fancy spreadsheet capable of tracking and scoring
                            predictions. With this, he challenged his family members whether they liked it or not.
                        </Typography>
                        <Typography className={classes.textBlock} variant={"body1"} color={"secondary"}>
                            It's ok, we thought, we've made it fool proof, we thought! ... call after call of, It's not working..., I've done
                            something to it... and, how do I change this... drove us to despair and so we decided to release it to the world and find
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
}

export default withStyles(styles)(Home)