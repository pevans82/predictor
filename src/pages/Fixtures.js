import React, {useEffect, useState} from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {AmplifyAuthenticator} from "@aws-amplify/ui-react";
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";
import {useAdminUser} from "../hooks/useAdminUser";
import API, {graphqlOperation} from "@aws-amplify/api";
import {fetchFixturesQuery, fetchTeamsQuery} from "../Queries";
import Fixture from "../components/Fixture";
import Fab from "@material-ui/core/Fab";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {AddIcon} from "@material-ui/data-grid";
import {onCreateRound, onUpdateRound} from "../graphql/subscriptions";
import {ConfirmDialog} from "../components/ConfirmDialog";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MomentUtils from '@date-io/moment';
import Moment from 'react-moment';
import {DateTimePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import Grid from "@material-ui/core/Grid";
import TeamCard from "../components/TeamCard";
import ProgressStepper from "../components/ProgressStepper";

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
    fixture: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
    },
    fixtureOptions: {
        margin: "auto",
        display: 'flex',
        width: 200,
    },
    grow: {
        flexGrow: 1,
    },
    form: {
        display: "flex",
        flexDirection: "column",
        maxWidth: 500,
        margin: "auto",
    },
    formInput: {
        margin: theme.spacing(2),
    },
}));

export default function Fixtures() {
    const classes = useStyles();
    const theme = useTheme();
    const adminUser = useAdminUser();

    const [fixtures, setFixtures] = useState([]);
    const [teams, setTeams] = useState([]);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchFixtures();
        fetchTeams();
    }, []);

    useEffect(() => {
        const updatedListener = assignUpdatedListener();
        const createdListener = assignCreatedListener();

        return function cleanup() {
            updatedListener.unsubscribe();
            createdListener.unsubscribe();
        };
    }, [fixtures]);

    async function fetchFixtures() {
        const rounds = await API.graphql(graphqlOperation(fetchFixturesQuery));
        setFixtures(rounds.data.roundByStatus.items);
    }

    async function fetchTeams() {
        const teams = await API.graphql(graphqlOperation(fetchTeamsQuery));
        setTeams(teams.data.listTeams.items.sort((a, b) => a.name.localeCompare(b.name)));
        setLeighIdx(teams.data.listTeams.items.findIndex(t => t.name === "Leigh Centurions"));
    }

    function assignUpdatedListener() {
        return API.graphql(graphqlOperation(onUpdateRound)).subscribe({
            next: (updated) => {
                const updatedRound = updated.value.data.onUpdateRound;
                setFixtures(
                    fixtures.map(round => {
                        return round.id === updatedRound.id ? updatedRound : round;
                    }));
            }
        });
    }

    function assignCreatedListener() {
        return API.graphql(graphqlOperation(onCreateRound)).subscribe({
            next: (created) => {
                fetchFixtures();
            }
        });
    }

    const handleAdd = () => {
        wipeFields();
        setEditMode(true);
    };

    async function handleDelete(fixture) {
        setRoundId(fixture.id);
        setDeleteConfirm(true);
    }

    const handleDeleteConfirm = () => {
        console.log("delete fixture", roundId);
    }

    const handleCancel = () => {
        wipeFields();
        setEditMode(false);
    }

    const wipeFields = () => {
        setRoundId(undefined);
        setKickOff(Moment.now);
        setHomeTeamIdx(leighIdx);
        setAwayTeamIdx(leighIdx);
        setGround(teams[leighIdx].ground);
    }

    function handleSubmit(event) {
        console.log("save fixture", ground, kickOff, homeTeamIdx, awayTeamIdx);
        setEditMode(false);
        event.preventDefault();
    }

    async function handleEdit(fixture) {
        setRoundId(fixture.id);
        setGround(fixture.ground ? fixture.ground : teams.find(t => t.id === fixture.homeTeam.id).ground);
        setKickOff(fixture.kickOff ? fixture.kickOff : Moment.now);
        setHomeTeamIdx(teams.findIndex(t => t.id === fixture.homeTeam.id));
        setAwayTeamIdx(teams.findIndex(t => t.id === fixture.awayTeam.id));
        setEditMode(true);
    }

    const [roundId, setRoundId] = useState();
    const [ground, setGround] = useState('');
    const [kickOff, setKickOff] = useState(Moment.now);
    const [homeTeamIdx, setHomeTeamIdx] = useState(0);
    const [awayTeamIdx, setAwayTeamIdx] = useState(0);
    const [leighIdx, setLeighIdx] = useState(0);

    const handleHomePrevious = () => {
        setHomeTeamIdx((idx) => idx - 1);
        setGround(teams[homeTeamIdx - 1].ground);
    };

    const handleHomeNext = () => {
        setHomeTeamIdx((idx) => idx + 1);
        setGround(teams[homeTeamIdx + 1].ground);
    };

    const handleAwayPrevious = () => {
        setAwayTeamIdx((idx) => idx - 1);
    };

    const handleAwayNext = () => {
        setAwayTeamIdx((idx) => idx + 1);
    };

    return (
        <AmplifyAuthenticator>
            <Box className={classes.root}>
                {adminUser ?
                    editMode ? <div><Typography className={classes.title} variant={"h2"} color={"primary"}>Change Fixture</Typography>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                                    <div className={classes.form}>
                                        <DateTimePicker
                                            className={classes.formInput}
                                            disablePast
                                            inputVariant="outlined"
                                            id="date-picker-dialog"
                                            label="Game Day"
                                            format="ddd Do MMM YYYY HH:mm"
                                            value={kickOff}
                                            onChange={setKickOff}
                                        />
                                        <Grid container justify={"center"}>
                                            <Grid item xs={5}>
                                                <ProgressStepper onHandleNext={handleHomeNext} onHandlePrevious={handleHomePrevious}
                                                                 maxSteps={teams.length} activeStep={homeTeamIdx}/>
                                                <TeamCard name={teams[homeTeamIdx].name} badgeSrc={teams[homeTeamIdx].badgeSrc}/>

                                            </Grid>
                                            <Grid item xs={2} style={{marginTop: "100px"}}>
                                                <Typography variant="h3" color={"primary"}>vs</Typography>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <ProgressStepper onHandleNext={handleAwayNext} onHandlePrevious={handleAwayPrevious}
                                                                 maxSteps={teams.length} activeStep={awayTeamIdx}/>
                                                <TeamCard name={teams[awayTeamIdx].name} badgeSrc={teams[awayTeamIdx].badgeSrc}/>
                                            </Grid>
                                        </Grid>
                                        <TextField
                                            className={classes.formInput}
                                            id="ground"
                                            label="Ground"
                                            variant="outlined"
                                            value={ground}
                                            onInput={e => setGround(e.target.value)}
                                        />
                                    </div>
                                    <Button style={{marginTop: theme.spacing(5)}} fullWidth={true} variant="contained" type={"submit"}
                                            color="primary">Save</Button>
                                    <Button style={{marginTop: theme.spacing(5)}} fullWidth={true} variant="contained" type={"cancel"}
                                            color="secondary" onClick={handleCancel}>Cancel</Button>

                                </form>
                            </MuiPickersUtilsProvider>
                        </div>
                        :
                        <div>
                            <Typography className={classes.title} variant={"h2"} color={"primary"}>Fixtures</Typography>
                            {fixtures.length > 10 &&
                            <Fab color="primary" aria-label="add">
                                <AddIcon onClick={handleAdd}/>
                            </Fab>}
                            {fixtures.map((fixture, idx) => {
                                return <div className={classes.fixture} key={idx}>
                                    <Card elevation={10}>
                                        <Fixture round={fixture}/>
                                        <CardContent className={classes.fixtureOptions}>
                                            <Fab color="primary" size="medium" aria-label="edit">
                                                <EditIcon onClick={() => handleEdit(fixture)}/>
                                            </Fab>
                                            <div className={classes.grow}></div>
                                            <Fab color="secondary" size="medium" aria-label="delete">
                                                <DeleteIcon onClick={() => handleDelete(fixture)}/>
                                            </Fab>
                                        </CardContent>
                                    </Card>
                                </div>
                            })}
                            {fixtures && <Fab color="primary" aria-label="add">
                                <AddIcon onClick={handleAdd}/>
                            </Fab>}
                            <ConfirmDialog
                                title="Delete this fixture?"
                                open={deleteConfirm}
                                setOpen={setDeleteConfirm}
                                onConfirm={handleDeleteConfirm}
                            >
                                <Typography variant={"body1"}>Are you sure you want to
                                    delete {teams[homeTeamIdx].name} vs {teams[awayTeamIdx].name}?</Typography>
                            </ConfirmDialog>
                        </div>
                    :
                    <div>
                        <Typography className={classes.title} variant={"h2"} color={"primary"}>! Naughty !</Typography>
                        <Typography variant={"body1"}>You're not allowed to be here.</Typography>
                    </div>
                }
            </Box>
        </AmplifyAuthenticator>
    );
}