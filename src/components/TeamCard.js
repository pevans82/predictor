import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "auto",
    },
    media: {
        height: "125px",
        width: "125px",
        paddingTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    name: {
        padding: theme.spacing(1),
    }
}));

export default function TeamCard(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <img className={classes.media} src={props.badgeSrc} alt="Logo"/>
            <Typography className={classes.name} gutterBottom variant="h5" color={"primary"}>
                <Box fontWeight="fontWeightBold">
                    {props.name}
                </Box>
            </Typography>
        </div>
    );
}