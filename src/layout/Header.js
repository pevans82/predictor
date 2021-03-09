import React, {useState} from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from "react-router-dom";
import UserMenu from './UserMenu'
import {FixturesRoute, HomeRoute, HowToRoute, LeaderboardRoute, PlayRoute, ResultsRoute, ScoreRoute} from "../pages/Pages";
import Typography from "@material-ui/core/Typography";
import Backdrop from "@material-ui/core/Backdrop";
import {useAdminUser} from "../hooks/useAdminUser";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
    headerRoot: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: theme.spacing(1),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    grow: {
        flexGrow: 1,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    backdrop: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function Header() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const adminUser = useAdminUser();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.headerRoot}>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        color="inherit"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography color={"secondary"}>Super Leigh</Typography>
                    <div className={classes.grow}/>
                    <UserMenu/>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <ListItem button component={Link} to={HomeRoute} key={"Home"} onClick={handleDrawerClose}>
                        <ListItemText primary="Home"/>
                    </ListItem>
                    <ListItem button component={Link} to={PlayRoute} key={"Play"} onClick={handleDrawerClose}>
                        <ListItemText primary="Play"/>
                    </ListItem>
                    <ListItem button component={Link} to={ResultsRoute} key={"Results"} onClick={handleDrawerClose}>
                        <ListItemText primary="Results"/>
                    </ListItem>
                    <ListItem button component={Link} to={LeaderboardRoute} key={"Leaderboard"} onClick={handleDrawerClose}>
                        <ListItemText primary="Leaderboard"/>
                    </ListItem>
                    <Divider/>
                    <ListItem button component={Link} to={HowToRoute} key={"How-to"} onClick={handleDrawerClose}>
                        <ListItemText primary="How it works?"/>
                    </ListItem>
                    {adminUser && <div>
                        <Divider/>
                        <ListItem button component={Link} to={ScoreRoute} key={"score"} onClick={handleDrawerClose}>
                            <ListItemText primaryTypographyProps={{color: "primary"}} primary="Score"/>
                        </ListItem>
                        <ListItem button component={Link} to={FixturesRoute} key={"fixtures"} onClick={handleDrawerClose}>
                            <ListItemText primaryTypographyProps={{color: "primary"}} primary="Fixtures"/>
                        </ListItem>
                    </div>}
                </List>
            </Drawer>
            <Backdrop className={classes.backdrop} open={open} onClick={handleDrawerClose}/>
        </div>
    );
}
