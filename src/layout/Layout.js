import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import {makeStyles} from '@material-ui/core/styles';
import Pages from "../pages/Pages";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    page: {
        textAlign: "center",
        width: '100%',
    },
    toolbar: theme.mixins.toolbar,
}));

export default function Layout() {
    const classes = useStyles();

    return (
        <div>
            <Header/>
            <div className={classes.toolbar}/>
            <Box className={classes.page}>
                <Pages/>
            </Box>
            <Footer/>
        </div>
    );
}
