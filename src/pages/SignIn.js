import React, {useEffect} from 'react';
import {useHistory} from "react-router";
import {AuthState, onAuthUIStateChange} from "@aws-amplify/ui-components";
import Authenticator from "../components/Authenticator";

export default function SignIn() {
    const history = useHistory();
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
            <Authenticator/>
    );
}