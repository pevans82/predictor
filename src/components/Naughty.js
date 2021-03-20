import Typography from "@material-ui/core/Typography";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: "bolder",
        margin: "auto",
        padding: theme.spacing(2),
        maxWidth: 500,
    },
}));


export default function Naughty() {
    const classes = useStyles();

    return (
        <div>
            <Typography className={classes.title} variant={"h2"} color={"primary"}>! Naughty !</Typography>
            <Typography className={classes.title} variant={"h4"}>You're not allowed to be here.</Typography>
        </div>
    )
};