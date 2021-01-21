import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {AmplifyAuthenticator} from "@aws-amplify/ui-react";
import Pages from "../pages/Pages";
import {Box} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    page: {
        textAlign: "center",
        width: '100%',
    },
    toolbar: theme.mixins.toolbar,
}));

export default function Layout() {
    const classes = useStyles();
    const theme = useTheme();

    const [signIn, setSignIn] = React.useState(false);
    const handleSignIn = () => {
        setSignIn(true)
    }

    return (
        <div>
            <Header onSignInClick={handleSignIn}/>
            <div className={classes.toolbar}/>
            {signIn && <AmplifyAuthenticator/>}
            <Box className={classes.page}>
                <Pages/>
            </Box>
            <Footer/>
        </div>
    );
}
