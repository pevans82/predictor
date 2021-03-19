import React, {useEffect, useState} from 'react';
import {Hub} from '@aws-amplify/core';
import {AmplifyAuthenticator, AmplifySignUp} from '@aws-amplify/ui-react';
import {TOAST_AUTH_ERROR_EVENT, UI_AUTH_CHANNEL} from '@aws-amplify/ui-components';
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" direction="up" {...props} />;
}

export default function Authenticator({children}) {
    const [alertMessage, setAlertMessage] = useState('');
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const handleToastErrors = ({payload}) => {
        if (payload.event === TOAST_AUTH_ERROR_EVENT && payload.message) {
            setAlertMessage(payload.message);
            setOpenSnackBar(true);
        }
    };

    useEffect(() => {
        Hub.listen(UI_AUTH_CHANNEL, handleToastErrors);
        return () => Hub.remove(UI_AUTH_CHANNEL, handleToastErrors);
    });

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    return (
        <>
            {alertMessage && (
                <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleSnackBarClose}>
                    <Alert onClose={handleSnackBarClose} severity="error">
                        {alertMessage}
                    </Alert>
                </Snackbar>)}
            <AmplifyAuthenticator hideToast>
                <AmplifySignUp
                    slot="sign-up"
                    formFields={[
                        {type: "username"},
                        {type: "password"},
                        {type: "email"}
                    ]}
                />
                {children}
            </AmplifyAuthenticator>
        </>
    );
}