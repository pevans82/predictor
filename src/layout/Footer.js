import React from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    footer: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '150px',
        background: '#000',
    },
}));

export default function Footer() {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className={classes.footer}>
            <Typography color={"secondary"} variant={"h1"}> Hi</Typography>
        </div>
    );
}