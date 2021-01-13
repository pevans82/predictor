import React, { Component } from 'react';
import {Box, makeStyles} from '@material-ui/core';
import { withTheme, withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    textAlign: "center",
});

class Home extends Component {
    render() {

        return (
            <Box>
                Home Page
            </Box>
        );
    }
}
export default withStyles(styles)(Home)