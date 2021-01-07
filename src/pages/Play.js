import React, { Component } from 'react';
import { Box } from '@material-ui/core';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

class Play extends Component {
    render() {
        return (
            <Box>
                Play
            </Box>
        );
    }
}

export default withAuthenticator(Play, true);