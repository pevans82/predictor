import React, { Component } from 'react';
import { Box } from '@material-ui/core';
import {withAuthenticator} from "@aws-amplify/ui-react";
class Profile extends Component {
    render() {
        return (
            <Box>
                Profile
            </Box>
        );
    }
}
export default withAuthenticator(Profile, true);