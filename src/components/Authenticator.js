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

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                        {
                            type: "username",
                            handleInputChange: (event, cb) => {
                                setUsername(event.target.value);
                                cb(event);
                            },
                            value: username,
                        },
                        {
                            type: "email",
                            handleInputChange: (event, cb) => {
                                setEmail(event.target.value);
                                cb(event);
                            },
                            value: email,
                        },
                        {
                            type: "password",
                            handleInputChange: (event, cb) => {
                                setPassword(event.target.value);
                                cb(event);
                            },
                            value: password,
                        },
                    ]}
                />
                {children}
            </AmplifyAuthenticator>
        </>
    );
}