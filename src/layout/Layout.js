import React, { Component } from 'react';
import './Layout.scss';
import { Box, List, Divider, ListItem, ListItemIcon, ListItemText, Hidden, Drawer, Typography, AppBar, Toolbar, IconButton } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import Help from '@material-ui/icons/Help';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { HomeRoute, PlayRoute, LeaderboardRoute } from "../Routing";
import { Link } from "react-router-dom";

const drawerWidth = 250;
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#fefefe',
        },
        secondary: {
            main: '#3e4f6a',
        },
    },
});
const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "rgba(23, 37, 42, 1)",
        color: "#fefefe",
        border: "none",
    },
    content: {
        flexGrow: 1,
        minHeight: "100vh",
    },
    icon: {
        color: "#fefefe",
    },
    toolbar: theme.mixins.toolbar,
});
class Layout extends Component {
    state = {
        mobileOpen: false,
    };
    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };
    render() {
        const { classes } = this.props;
        const { mobileOpen } = this.state;
        const drawer = (
            <div id="drawer-container">
                <div className="logo-drawer" />
                <List>
                    <ListItem button component={Link} to={HomeRoute} onClick={mobileOpen ? this.handleDrawerToggle : null}>
                        <ListItemIcon>
                            <Help className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <Divider />
                    <ListItem button component={Link} to={PlayRoute} onClick={mobileOpen ? this.handleDrawerToggle : null}>
                        <ListItemIcon>
                            <PersonIcon className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText primary="Play" />
                    </ListItem>
                    <Divider />
                    <ListItem button component={Link} to={LeaderboardRoute} onClick={mobileOpen ? this.handleDrawerToggle : null}>
                        <ListItemIcon>
                            <PersonIcon className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText primary="Leaderboard" />
                    </ListItem>
                </List>
            </div>
        );
        return (
            <div>
                <div id="main-background" />
                <div id="main-layout">
                    <MuiThemeProvider theme={theme}>
                        <div className={classes.root} >
                            <Hidden mdUp implementation="css">
                                <AppBar position="fixed" color="secondary">
                                    <Toolbar>
                                        <IconButton
                                            color="inherit"
                                            aria-label="Open drawer"
                                            onClick={this.handleDrawerToggle}
                                            className={classes.menuButton}
                                        >
                                            <MenuIcon />
                                        </IconButton>
                                        <Typography variant="h6" color="inherit" className={classes.title}>
                                            New app
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                            </Hidden>
                            <nav className={classes.drawer}>
                                <Hidden mdUp implementation="css">
                                    <Drawer
                                        color="primary"
                                        className={classes.drawer}
                                        variant="temporary"
                                        open={mobileOpen}
                                        onClose={this.handleDrawerToggle}
                                        classes={{
                                            paper: classes.drawerPaper,
                                        }}
                                        anchor="left"
                                    >
                                        {drawer}
                                    </Drawer>
                                </Hidden>
                                <Hidden smDown implementation="css">
                                    <Drawer
                                        classes={{
                                            paper: classes.drawerPaper,
                                        }}
                                        variant="permanent"
                                        open
                                    >
                                        {drawer}
                                    </Drawer>
                                </Hidden>
                            </nav>
                            <main className={classes.content}>
                                <Hidden mdUp implementation="css"><div className={classes.toolbar} /></Hidden>
                                <Box width="100%" className="mainContent">{this.props.children}</Box>
                            </main>
                        </div>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }
}
export default withStyles(styles)(Layout)