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
    table: {
        flexGrow: 1,
    },
    header: {
        background: "linear-gradient(#BE1D2C, #FFF)",
    },
    playerRow: {
        background: "#BE1D2C",
        color: "#FFF",
    },
    standardRow: {
        background: "#FFF",
    },
}));

export default function PointsTable(props) {
    const classes = useStyles();

    return (
        <TableContainer>
            <Table className={classes.table} aria-label="points table">
                <TableHead>
                    <TableRow className={classes.header}>
                        <TableCell ><Typography variant="h6" color={"secondary"}>Pos</Typography></TableCell>
                        <TableCell  color={"secondary"}><Typography variant="h6" color={"secondary"}>Player</Typography></TableCell>
                        <TableCell  color={"secondary"} align="right"><Typography variant="h6" color={"secondary"}>Points</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map((row) => (
                        <TableRow key={row.key} className={row.player === props.username ? classes.playerRow : classes.standardRow}>
                            <TableCell className={row.player === props.username ? classes.playerRow : classes.standardRow}><Typography variant={"body1"}>{row.position}</Typography></TableCell>
                            <TableCell className={row.player === props.username ? classes.playerRow : classes.standardRow}><Typography variant={"body1"}>{row.player}</Typography></TableCell>
                            <TableCell className={row.player === props.username ? classes.playerRow : classes.standardRow} align="right"><Typography variant={"body1"}>{row.points}</Typography></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
