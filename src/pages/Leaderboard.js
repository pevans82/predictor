import React, { Component } from 'react';
import { Box } from '@material-ui/core';
import {withAuthenticator} from "@aws-amplify/ui-react";
class Leaderboard extends Component {
    render() {
        return (
            <Box>
                Leaderboard
            </Box>
        );
    }
}
export default withAuthenticator(Leaderboard, true);