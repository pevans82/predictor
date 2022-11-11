import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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

export default function Profile() {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Typography className={classes.title} variant={"h2"} color={"primary"}>Terms and Conditions</Typography>
            <Typography className={classes.title} variant={"h4"} color={"primary"}>Players</Typography>
            <List>
                <ListItem>
                    <ListItemText
                        primary='This website is open and completely free to any persons wishing to partake in "the game" no matter where you are from, where you live now or who you support.'/>
                </ListItem>
                <ListItem>
                    <ListItemText primary="In order to play you must register with a valid email address."/>
                </ListItem>
                <ListItem>
                    <ListItemText primary="If you have dependents that wish to play but don't have a valid email address then it is acceptable to use a guardians email address for
            the purpose of registration. The email holder (i.e. guardian not dependent) will then be held responsible for honouring any terms and
            conditions laid out."/>
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Players will be deemed to have accepted these terms and conditions and agreed to be bound by them when registering an account."/>
                </ListItem>
            </List>
            <Typography className={classes.title} variant={"h4"} color={"primary"}>The Game</Typography>
            <List>
                <ListItem>
                    <ListItemText primary='Points will be scored as follows:- Players will receive 5 points for a correct score, 5 points for a correct result and a maximum of 10
            points for differences between the result and the prediction, dropping 1 point for every two points difference until the difference is 20.'/>
                </ListItem>
                <ListItem>
                    <ListItemText primary='There is one fixture per round.'/>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Although the fixture will usually be Leigh's next fixture, it is not required to be so and on occasion we reserve the right to
            play a different fixture."/>
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary='Predictions can be updated as often as you like up until the fixture kicks off. The kick off time is clearly displayed on both the home page and the play page when
            entering predictions. Once a round is in play, predictions can no longer be updated.'/>
                </ListItem>
                <ListItem>
                    <ListItemText primary='Failure to register a prediction before the round closes results in 0 (zero) points being scored.'/>
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary='If the fixture is postponed, abandoned or not completed (where less than 80 minutes is played) the round will be considered void and no points will be scored.'/>
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary='If the fixture is drawn after 80 minutes and golden point extra time is played then the score used will be the final score at the end of additional time.'/>
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary='We reserve the right to "remove" any account without prior warning if deemed to not be following the terms and conditions.'/>
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary='This game is just a bit of fun and no prizes will be issued for winning a round or a season. There are no cash alternatives!'/>
                </ListItem>
            </List>
        </Box>
    );
}