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
                           content="Each round has a single fixture that is most likely to be Leigh Centurions' next game. A round goes through various stages:"/>
            <TitledContent title="Open" variant={"h6"}
                           content="The next round will open as soon as the previous round is complete.  While a round is open, you may update your predications as often as you like until the round becomes in play."/>
            <TitledContent title={"In Play"} variant={"h6"}
                           content={"A round is in play when the game kicks off.  The kick off time can be seen just above the teams on the fixture.  Once the game is in play you can no longer update your prediction."}/>
            <TitledContent title={"Complete"} variant={"h6"}
                           content={"After the game has finished and the scores have been verified, the round will be complete.  Your score for the round will be calculated and the leaderboards will be updated. The next round will also be opened."}/>
            <Typography className={classes.title} variant={"h4"} color={"primary"}>Scoring</Typography>
            <TitledContent title="Points allocation" variant={"h5"}
                           content="The closer you are to the final score, the more points you'll earn.  Points are allocated as follows:"/>
            <TitledContent title="Correct Score - 5 points" variant={"h6"}
                           content="Predicting the correct score is a pretty impressive feat so we'll give you an extra 5 points for being spot on."/>
            <TitledContent title="Correct Result - 5 points" variant={"h6"}
                           content="Predicting the correct result is also worth an extra 5 points. A correct result is awarded if you correctly predict the winning team, even if you didn't get the right scores."/>
            <TitledContent title="Points Difference - Max 10 points" variant={"h6"}
                           content="A maximum of 10 points are up for grabs here. These points are allocated for the differences between the result and the prediction. 1 point is lost for every 2 points difference until the difference is 20."/>
            <Typography className={classes.title} variant={"h4"} color={"primary"}>Examples</Typography>
            <TitledContent title="Example result" variant={"h5"}
                           content="Let's pick a completely random result from Leigh Centurions' last time in the top flight."/>
            <Fixture round={{
                ground: "Leigh Sports Village",
                kickOff: "2017-06-08T20:00:00.000Z",
                homeTeam: {name: "Leigh Centurions", badgeSrc: "../teams/leigh.png"},
                awayTeam: {name: "Wigan Warriors", badgeSrc: "../teams/wigan.png"}
            }}/>
            <ScoreCard id={"results"} homeScore={50} awayScore={34}/>
            <TitledContent title="Example 1" variant={"h6"}
                           content="Had you have predicted the final score to be 50 - 34, you would have received 20 points for being spot on."/>
            <PointsBreakdown scorePoints={5} resultPoints={5} difference={0} diffPoints={10} total={20}/>
            <TitledContent title="Example 2" variant={"h6"}
                           content="Had you have predicted the final score to be 40 - 24, 20 - 4, 16 - 0, you would have received 15 points."/>
            <PointsBreakdown scorePoints={0} resultPoints={5} difference={0} diffPoints={10} total={15}/>
            <Typography className={classes.textBlock} variant="body1" color={"textSecondary"} component="p">Here we receive the maximum 10 points
                because there is no points difference between the result (16) and our predictions (16).</Typography>
            <TitledContent title="Example 3" variant={"h6"}
                           content="Had you have predicted the final score to be 50 - 40 or 20 - 10, 10 - 0, you would have received 12 points."/>
            <PointsBreakdown scorePoints={0} resultPoints={5} difference={6} diffPoints={7} total={12}/>
            <Typography className={classes.textBlock} variant="body1" color={"textSecondary"} component="p">Here we receive 7 points because there is
                a 6 point difference between the result (16) and our predictions (10).</Typography>
            <TitledContent title="Example 4" variant={"h6"}
                           content="Had you have predicted the final score to be 50 - 16, you would have received 6 points."/>
            <PointsBreakdown scorePoints={0} resultPoints={5} difference={18} diffPoints={1} total={6}/>
            <Typography className={classes.textBlock} variant="body1" color={"textSecondary"} component="p">Here we only receive 1 point because there
                is an 18 point difference between the result (16) and our prediction (34).</Typography>
            <TitledContent title="Example 5" variant={"h6"}
                           content="If you were a nervous pie'ater and have predicted the final score to be 10 - 12, you would have received 1 point."/>
            <PointsBreakdown scorePoints={0} resultPoints={0} difference={18} diffPoints={1} total={1}/>
            <Typography className={classes.textBlock} variant="body1" color={"textSecondary"} component="p">Here we only receive 1 point because there
                is an 18 point difference between the result (16) and our prediction (-2).</Typography>
        </Box>
    );
}