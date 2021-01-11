import React from 'react';
import Box from '@material-ui/core/Box';
import Header from "./Header";
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import {CssBaseline} from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#BE1D2C',
        },
        secondary: {
            main: '#000',
        },
    },
});

const styles = theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
});

class Layout extends React.Component {
    render() {
        const {classes} = this.props;

        return (
            <div>
                <CssBaseline/>
                <MuiThemeProvider theme={theme}>
                    <div id="main-layout">
                        <Header/>
                        <main className={classes.content}>
                            <div className={classes.toolbar}/>
                            <Box width="100%" className="mainContent">{this.props.children}</Box>
                        </main>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withStyles(styles)(Layout)
