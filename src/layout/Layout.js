import React from 'react';
import Box from '@material-ui/core/Box';
import Header from "./Header";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {AmplifyAuthenticator} from "@aws-amplify/ui-react";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
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
            <div id="main-layout">
                <Header onSignInClick={handleSignIn}/>
                {signIn && <AmplifyAuthenticator/>}
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Box width="100%" className="mainContent">{props.children}</Box>
                </main>
            </div>
        </div>
    );
}
