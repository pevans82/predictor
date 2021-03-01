import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import {HomeRoute} from "./Pages";

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
    textBlock: {
        maxWidth: 500,
        margin: "auto",
        padding: theme.spacing(2),
    },
}));

export default function Profile() {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Typography className={classes.title} variant={"h2"} color={"primary"}>About</Typography>
            <Typography className={classes.textBlock} variant="body1" component="p"><Link href={HomeRoute}>superleigh.co.uk</Link> is owned and
                controlled by rocSOLID Services Ltd.</Typography>
            <Typography className={classes.textBlock} variant="body1" component="p">Believe it or not, this is just a side project delivered and
                maintained by an individual driven by a labour of love. It is not manned by a fleet of IT professionals on hand 24/7. Please be
                patient with any queries or concerns.
            </Typography>
            <Typography className={classes.textBlock} variant="body2" component="p">"Roman Helmet" icon by parkjisun from the Noun
                Project.</Typography>
        </Box>
    );
}