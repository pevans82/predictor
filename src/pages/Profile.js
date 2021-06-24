import React, {useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core/styles";
import {useUser} from "../hooks/useUser";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Authenticator from "../components/Authenticator";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import API, {graphqlOperation} from "@aws-amplify/api";
import {listPreferences} from "../graphql/queries";
import * as mutations from "../graphql/mutations";

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
    table: {
        maxWidth: 500,
        margin: "auto",
    },
}));

export default function Profile() {
    const classes = useStyles();
    const user = useUser();

    const [preferenceId, setPreferenceId] = useState(0);
    const [matchday, setMatchday] = useState(false);
    const [results, setResults] = useState(false);

    useEffect(() => {
        if (!user) {
            setPreferenceId(0);
        }
        fetchPreferences();
    }, [user]);

    async function fetchPreferences() {
        if (user) {
            const preferences = await API.graphql(graphqlOperation(listPreferences));
            if (preferences.data.listPreferences.items.length < 1) {
                setPreferenceId(0);
                setMatchday(false);
                setResults(false);
            } else {
                setPreferenceId(preferences.data.listPreferences.items[0].id);
                setMatchday(preferences.data.listPreferences.items[0].matchday);
                setResults(preferences.data.listPreferences.items[0].results);
                console.log("pref id is",preferences.data.listPreferences.items[0].id)
                console.log("matchday is",preferences.data.listPreferences.items[0].matchday)
                console.log("results is", preferences.data.listPreferences.items[0].results)
            }
        }
    }

    async function savePreferences(newMatchday, newResults) {
        console.log("pref id is",preferenceId)
        console.log("matchday is",matchday)
        console.log("results is", results)
        if (preferenceId) {
            await API.graphql({
                query: mutations.updatePreference,
                variables: {input: {id: preferenceId, matchday: newMatchday, results: newResults}},
                authMode: 'AMAZON_COGNITO_USER_POOLS'
            });
        } else {
            const pred = await API.graphql({
                query: mutations.createPreference,
                variables: {input: {matchday: newMatchday, results: newResults}},
                authMode: 'AMAZON_COGNITO_USER_POOLS'
            });
            setPreferenceId(pred.data.createPreference.id);
        }
    }

    const handleMatchdayChange = (event) => {
        setMatchday(event.target.checked);
        savePreferences(event.target.checked, results);
    };

    const handleResultsChange = (event) => {
        setResults(event.target.checked);
        savePreferences(matchday, event.target.checked);
    };

    return (
        <Authenticator>
            <Box className={classes.root}>
                <Typography className={classes.title} variant={"h2"} color={"primary"}>Profile</Typography>
                {user && <TableContainer>
                    <Table className={classes.table} aria-label="profile details">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key={"username"}>
                                <TableCell>
                                    <Typography variant={"caption"} display={"block"}>Username</Typography>
                                    <Typography variant={"body1"}>{user.username}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow key={"email"}>
                                <TableCell>
                                    <Typography variant={"caption"} display={"block"}>Email address</Typography>
                                    <Typography variant={"body1"}>{user.attributes.email}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow key={"preferences"}>
                                <TableCell>
                                    <Typography variant={"caption"} display={"block"}>Preferences</Typography>
                                    <FormControl component="fieldset">
                                        <FormControlLabel
                                            value="matchday"
                                            control={<Checkbox color="primary"/>}
                                            label="opt out of matchday reminder email"
                                            checked={matchday}
                                            onChange={handleMatchdayChange}
                                        />
                                        <FormControlLabel
                                            value="results"
                                            control={<Checkbox color="primary"/>}
                                            label="opt out of results email"
                                            checked={results}
                                            onChange={handleResultsChange}
                                        />
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                }
            </Box>
        </Authenticator>
    );
}