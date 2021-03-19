import React from 'react';
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
                            <TableRow key={"email"}>
                                <TableCell>
                                    <Typography variant={"caption"} display={"block"}>Phone number</Typography>
                                    <Typography variant={"body1"}>{user.attributes.phone_number}</Typography>
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