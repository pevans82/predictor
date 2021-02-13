import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 100,
        height: 100,
        textAlign: "center",
        margin: "auto",
    },
    value: {
        paddingTop: 25,
        fontSize: 40,
    }
}));

export default function StaticScoreField(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.root} variant="outlined" elevation={3}>
            <Typography className={classes.value} variant="h3" component="h2">{props.value}</Typography>
        </Paper>
    );
}