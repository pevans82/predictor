import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import {AmplifySignOut} from "@aws-amplify/ui-react";
import {AuthState, onAuthUIStateChange} from "@aws-amplify/ui-components";
import {Typography} from "@material-ui/core";
import {ProfileRoute} from "../pages/Pages";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

export default function UserMenu({ onSignInClick }) {
    const classes = useStyles();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [authState, setAuthState] = React.useState();
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData);
            handleClose();
        });
    }, []);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return authState === AuthState.SignedIn && user ? (
        <div>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                className={classes.menuButton}
            >
                <AccountCircle/>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem disabled={true}><Typography variant={"h6"}>Hello, {user.username}</Typography></MenuItem>
                <MenuItem component={Link} to={ProfileRoute} key={"profile"} onClick={handleClose}>Profile</MenuItem>
                <AmplifySignOut onClick={handleClose}/>
            </Menu>
        </div>
    ) : (
        <div>
            <Button onClick={onSignInClick} color="inherit">Sign in</Button>
        </div>
    );
}