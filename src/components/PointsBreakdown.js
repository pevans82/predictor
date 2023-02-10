import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 500,
        margin: "auto",
    },
    table: {
        flexGrow: 1,
    },
    header: {
        background: "linear-gradient(#BE1D2C, #FFF)",
    },
    total: {
        background: "#BE1D2C",
        color: "#FFF",
    },
}));

export default function PointsBreakdown(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TableContainer>
                <Table className={classes.table} aria-label="points table">
                    <TableHead>
                        <TableRow className={classes.header}>
                            <TableCell><Typography variant="h6" color={"secondary"}>Your Points</Typography></TableCell>
                            <TableCell><Typography variant="h6" color={"secondary"}></Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={"home-score"}>
                            <TableCell><Typography variant={"body1"}>Home score difference of {props.homeDiff}</Typography></TableCell>
                            <TableCell align="right"><Typography variant={"body1"}>{props.homePoints} points</Typography></TableCell>
                        </TableRow>
                        <TableRow key={"result"}>
                            <TableCell><Typography variant={"body1"}>Away score difference of {props.awayDiff}</Typography></TableCell>
                            <TableCell align="right"><Typography variant={"body1"}>{props.awayPoints} points</Typography></TableCell>
                        </TableRow>
                        <TableRow key={"diff"}>
                            <TableCell><Typography variant={"body1"}>Result {props.correctResult === true ? 'difference of ' + props.resultDiff : 'incorrect'}</Typography></TableCell>
                            <TableCell align="right"><Typography variant={"body1"}>{props.resultPoints} points</Typography></TableCell>
                        </TableRow>
                        <TableRow className={classes.total} key={"total"}>
                            <TableCell className={classes.total}><Typography variant={"body1"}>Total</Typography></TableCell>
                            <TableCell className={classes.total} align="right"><Typography
                                variant={"body1"}>{props.total} points</Typography></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
