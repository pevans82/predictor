import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core/styles";
import {ProfileRoute} from "./Pages";
import Link from "@material-ui/core/Link";

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
            <Typography className={classes.title} variant={"h2"} color={"primary"}>Privacy</Typography>
            <Typography className={classes.textBlock} variant="body1" component="p">We take privacy seriously. Rest assured we will only ever ask for
                information that we absolutely need.</Typography>
            <Typography className={classes.textBlock} variant="body1" component="p">We are committed to protecting your privacy. We'll be as clear and
                open as we possibly can about why we need any personal information and how we'll use it. We will never sell or disclose any personal
                information provided to us and we'll store it as safely as we possibly can.  If you want to know what we've got on you, you can view
                it all on your <Link href={ProfileRoute}>profile</Link> page.
            </Typography>
            <Typography className={classes.textBlock} variant="body1" component="p">To comply with UK data protection law, <strong>rocSOLID Services
                Ltd</strong> are registered as a 'Data Controller' with the Information Commissioner's Office (ICO). These details are published on a
                public register on the ICO website at http://ico.org.uk.</Typography>
            <Typography className={classes.textBlock} variant="body1" component="p">Please remember to keep your passwords secret and safe. Do not use
                anything obvious and try to add complexity with the use letters, numbers and case. Try not to use the same password across multiple
                websites and don't forget to change them every now and again to keep the bad guys on their toes.</Typography>
        </Box>
    );
}