import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {AmplifyAuthenticator} from "@aws-amplify/ui-react";
import Pages from "../pages/Pages";
import {Box} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    content: {
        // flexGrow: 1,
        // minHeight: '100vh',
        alignItems: "center",
    },
    toolbar: theme.mixins.toolbar,
}));

export default function Layout(props) {
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
            <Box className={classes.content}>
                <Pages/>
            </Box>
            <Footer/>
        </div>
    );
}
