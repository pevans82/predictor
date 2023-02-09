import React from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import {createTheme, MuiThemeProvider} from "@material-ui/core/styles";
import {CssBaseline, responsiveFontSizes} from "@material-ui/core";
import Layout from "./layout/Layout";
import {BrowserRouter as Router} from "react-router-dom";

Amplify.configure(awsconfig);

let theme = createTheme({
    palette: {
        primary: {
            main: '#BE1D2C',
        },
        secondary: {
            main: '#fff',
        },
    },
});

theme = responsiveFontSizes(theme);

function App() {
    return (
        <CssBaseline/>,
            <Router>
                <MuiThemeProvider theme={theme}>
                    <Layout/>
                </MuiThemeProvider>
            </Router>
    );
}

export default App;