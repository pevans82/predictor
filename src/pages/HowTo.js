import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core/styles";
import Fixture from "../components/Fixture";
import PointsBreakdown from "../components/PointsBreakdown";
import ScoreCard from "../components/ScoreCard";
import TitledContent from "../components/TitledContent";

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
    textBlock: {
        maxWidth: 500,
        margin: "auto",
        padding: theme.spacing(2),
    },
}));

export default function HowTo() {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Typography className={classes.title} variant={"h2"} color={"primary"}>How it works?</Typography>
            <Typography className={classes.title} variant={"h4"} color={"primary"}>Playing the game</Typography>
            <TitledContent title="Rounds" variant={"h5"}
                           content="Each round has a single fixture that is most likely to be Leigh's next game. A round goes through various stages:"/>
            <TitledContent title="Open" variant={"h6"}
                           content="The next round will open as soon as the previous round is complete.  While a round is open, you may update your predications as often as you like until the round becomes in play."/>
            <TitledContent title={"In Play"} variant={"h6"}
                           content={"A round is in play when the game kicks off.  The kick off time can be seen just above the teams on the fixture.  Once the game is in play you can no longer update your prediction."}/>
            <TitledContent title={"Complete"} variant={"h6"}
                           content={"After the game has finished and the scores have been verified, the round will be complete.  Your score for the round will be calculated and the leaderboards will be updated. The next round will also be opened."}/>
            <Typography className={classes.title} variant={"h4"} color={"primary"}>Scoring</Typography>
            <TitledContent title="Points allocation" variant={"h5"}
                           content="The closer you are to the final score, the more points you'll earn.  There are a total of 25 points up for grabs.  1 point is lost for every 2 point difference and they are allocated as follows:"/>
            <TitledContent title="Home Score - Max 10 points" variant={"h6"}
                           content="Points are allocated for the difference between the predicted and actual home scores."/>
            <TitledContent title="Away Score - Max 10 points" variant={"h6"}
                           content="Points are allocated for the difference between the predicted and actual away scores."/>
            <TitledContent title="Result Difference- Max 5 points" variant={"h6"}
                           content="Points are allocated for the difference between the predicted and actual differences between home and away scores."/>
            <Typography className={classes.title} variant={"h4"} color={"primary"}>Examples</Typography>
            <TitledContent title="Example result" variant={"h5"}
                           content="Let's pick a completely random result from Leigh's 2017 Super League campaign."/>
            <Fixture round={{
                ground: "Leigh Sports Village",
                kickOff: "2017-06-08T20:00:00.000Z",
                homeTeam: {name: "Leigh Centurions", badgeSrc: "../teams/leigh-centurions.png"},
                awayTeam: {name: "Wigan Warriors", badgeSrc: "../teams/wigan.png"}
            }}/>
            <ScoreCard id={"results"} homeScore={50} awayScore={34}/>
            <TitledContent title="Example 1" variant={"h6"}
                           content="Had you have predicted the final score to be 50 - 34, you would have received 25 points for being spot on."/>
            <PointsBreakdown homeDiff={0} homePoints={10} awayDiff={0} awayPoints={10} resultDiff={0} resultPoints={5} total={25}/>
            <TitledContent title="Example 2" variant={"h6"}
                           content="Had you have predicted the final score to be 40 - 24, you would have received 15 points."/>
            <PointsBreakdown homeDiff={10} homePoints={5} awayDiff={10} awayPoints={5} resultDiff={0} resultPoints={5} total={15}/>
            <TitledContent title="Example 3" variant={"h6"}
                           content="Had you have predicted the final score to be 50 - 40, you would have received 19 points."/>
            <PointsBreakdown homeDiff={0} homePoints={10} awayDiff={6} awayPoints={7} resultDiff={6} resultPoints={2} total={19}/>
            <Typography className={classes.textBlock} variant="body1" color={"textSecondary"} component="p">We only receive 2 points for the result difference because there is
                a 6 point difference between the result (16) and our prediction (10).</Typography>
            <TitledContent title="Example 4" variant={"h6"}
                           content="Had you have predicted the final score to be 50 - 16, you would have received 11 points."/>
            <PointsBreakdown homeDiff={0} homePoints={10} awayDiff={18} awayPoints={1} resultDiff={18} resultPoints={0} total={11}/>
            <Typography className={classes.textBlock} variant="body1" color={"textSecondary"} component="p">We don't receive any points for the result difference because there
                is an 18 point difference between the result (16) and our prediction (34).</Typography>
            <TitledContent title="Example 5" variant={"h6"}
                           content="If you were a nervous pie'ater who predicted the final score to be 10 - 12, you would have received 0 points...and rightly so."/>
            <PointsBreakdown homeDiff={40} homePoints={0} awayDiff={22} awayPoints={0} resultDiff={18} resultPoints={0} total={0}/>
            <Typography className={classes.textBlock} variant="body1" color={"textSecondary"} component="p">We don't receive any points for the result difference because there
                is an 18 point difference between the result (16) and our prediction (-2).</Typography>
        </Box>
    );
}