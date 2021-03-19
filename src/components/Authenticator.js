import React, { useState, useEffect } from 'react';
import { Hub, HubCallback } from '@aws-amplify/core';
import {
    AmplifyAuthenticator,
} from '@aws-amplify/ui-react';
import {
    UI_AUTH_CHANNEL, TOAST_AUTH_ERROR_EVENT
} from '@aws-amplify/ui-components';
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" direction="up" {...props} />;
}

export default function Authenticator() {
    const [alertMessage, setAlertMessage] = useState('');
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const handleToastErrors = ({ payload }) => {
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
            <AmplifyAuthenticator hideToast />
        </>
    );
}