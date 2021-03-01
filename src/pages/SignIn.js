import React, {useEffect} from 'react';
import {AmplifyAuthenticator} from "@aws-amplify/ui-react";
import {useHistory} from "react-router";
import {AuthState, onAuthUIStateChange} from "@aws-amplify/ui-components";

export default function SignIn() {
    const history = useHistory()
    const [authState, setAuthState] = React.useState();

    useEffect(() => {
        onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
        });
    }, []);

    useEffect(() => {
        if (authState === AuthState.SignedIn) {
            history.goBack();
        }
    }, [authState]);

    return (
        <AmplifyAuthenticator/>
    );
}