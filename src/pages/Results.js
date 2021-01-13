import React, { Component } from 'react';
import { Box } from '@material-ui/core';
import { withAuthenticator } from '@aws-amplify/ui-react';

class Results extends Component {
    render() {
        return (
            <Box>
                Results
            </Box>
        );
    }
}

export default withAuthenticator(Results, true);