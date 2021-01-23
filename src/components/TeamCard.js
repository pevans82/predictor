import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Box} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        margin: "auto",
    },
    media: {
        height: "125px",
        width: "125px",
        paddingTop: "1rem",
    },
});

export default function TeamCard(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <img className={classes.media} src={props.badge} alt="Logo"/>
            <Typography gutterBottom variant="h5" color={"primary"}>
                <Box fontWeight="fontWeightBold">
                    {props.name}
                </Box>
            </Typography>
        </div>
    );
}