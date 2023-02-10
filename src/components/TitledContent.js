import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 800,
        margin: "auto",
    },
    title: {
        fontWeight: "bolder",
        margin: "auto",
        textAlign: "left",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(2),
        maxWidth: 800,
    },
    textBlock: {
        maxWidth: 800,
        margin: "auto",
        textAlign: "left",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
}));

export default function TitledContent(props) {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Typography className={classes.title} variant={props.variant} color={"primary"}>{props.title}</Typography>
            <Typography className={classes.textBlock} variant="body1" component="p">{props.content}</Typography>
        </Box>
    );
}