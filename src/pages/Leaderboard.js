import React, {useEffect, useState} from 'react';
import {AmplifyAuthenticator} from "@aws-amplify/ui-react";
import PropTypes from 'prop-types';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {fetchCompleteRoundsQuery, fetchRoundLeaderBoardByPointsQuery, fetchSeasonLeaderBoardByPointsQuery} from "../Queries";
import API, {graphqlOperation} from "@aws-amplify/api";
import PointsTable from "../components/PointsTable";
import ProgressStepper from "../components/ProgressStepper";
import StaticScoreField from "../components/StaticScoreField";
import {useUser} from "../hooks/useUser";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Box>{children}</Box>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

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
    tab: {
        backgroundColor: theme.palette.background.paper,
        maxWidth: 500,
        margin: "auto",
    },
}));

export default function LeaderBoard() {
    const classes = useStyles();
    const theme = useTheme();
    const user = useUser();

    const [tabValue, setTabValue] = useState(0);

    const [activeRound, setActiveRound] = useState(0);
    const [maxRounds, setMaxRounds] = useState(0);
    const [seasonPoints, setSeasonPoints] = useState(0);
    const [roundPoints, setRoundPoints] = useState(0);

    const [rounds, setRounds] = useState();
    const [seasonRankings, setSeasonRankings] = useState([]);
    const [roundRankings, setRoundRankings] = useState();

    useEffect(() => {
        setTabValue(1);
        fetchSeasonLeaderboard();
        fetchCompleteRounds();
    }, [user]);

    useEffect(() => {
        if (rounds) {
            fetchRoundLeaderboard(rounds.length - 1);
        }
    }, [rounds])

    useEffect(() => {
        fetchRoundLeaderboard(activeRound);
    }, [activeRound])

    async function fetchCompleteRounds() {
        if (user) {
            const result = await API.graphql(graphqlOperation(fetchCompleteRoundsQuery));
            const rounds = result.data.roundByStatus.items;
            if (rounds.length > 0) {
                setRounds(rounds);
                setMaxRounds(rounds.length);
                setActiveRound(rounds.length - 1);
            }
        }
    }

    async function fetchSeasonLeaderboard() {
        if (user) {
            const result = await API.graphql(graphqlOperation(fetchSeasonLeaderBoardByPointsQuery));
            if (result.data.seasonLeaderboardByPoints.items.length > 0) {
                const rankings =
                    result.data.seasonLeaderboardByPoints.items.map((r, i) => {
                        return {key: i, position: i + 1, player: r.username, points: r.points};
                    });
                setSeasonRankings(rankings);
                const points = rankings.filter(r => r.player === user.username).map(r => r.points);
                setSeasonPoints(points.length > 0 ? points : 0);
            }
        }
    }

    async function fetchRoundLeaderboard(roundIndex) {
        if (user && rounds) {
            const result = await API.graphql(graphqlOperation(fetchRoundLeaderBoardByPointsQuery, {roundId: rounds[roundIndex].id}));
            if (result.data.roundLeaderboardByPoints.items.length > 0) {
                const rankings =
                    result.data.roundLeaderboardByPoints.items.map((r, i) => {
                        return {key: i, position: i + 1, player: r.username, points: r.points};
                    });
                setRoundRankings(rankings);
                const points = rankings.filter(r => r.player === user.username).map(r => r.points);
                setRoundPoints(points.length > 0 ? points : 0);
            } else {
                setRoundRankings([]);
                setRoundPoints(0);
            }
        }
    }

    const handlePrevious = () => {
        setActiveRound((prevActiveRound) => prevActiveRound - 1);
    };

    const handleNext = () => {
        setActiveRound((prevActiveRound) => prevActiveRound + 1);
    };

    const handleChange = (event, newTabValue) => {
        setTabValue(newTabValue);
    };

    return (
        <AmplifyAuthenticator>
            <Box className={classes.root}>
                <div style={{marginBottom: theme.spacing(3)}}>
                    <Typography className={classes.title} variant={"h2"} color={"primary"}>Leaderboards</Typography>
                    <Typography className={classes.title} variant={"h4"} color={"primary"}>Points</Typography>
                    <StaticScoreField value={tabValue === 1 ? seasonPoints : roundPoints}/>
                </div>
                <div className={classes.tab}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={tabValue}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            aria-label="leaderboards tab"
                        >
                            <Tab label="Round" {...a11yProps(0)} />
                            <Tab label="Season" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={tabValue} index={0} dir={theme.direction}>
                        {maxRounds > 1 &&
                        <ProgressStepper onHandleNext={handleNext} onHandlePrevious={handlePrevious} maxSteps={maxRounds} activeStep={activeRound}/>}
                        {rounds &&
                        <Typography className={classes.title} variant={"h4"} color={"primary"}>Round {rounds[activeRound].number}</Typography>}
                        {roundRankings && user && <PointsTable rows={roundRankings} username={user.username}/>}
                    </TabPanel>
                    <TabPanel component={"div"} value={tabValue} index={1} dir={theme.direction}>
                        {user && <PointsTable rows={seasonRankings} username={user.username}/>}
                    </TabPanel>
                </div>
            </Box>
        </AmplifyAuthenticator>
    );
}