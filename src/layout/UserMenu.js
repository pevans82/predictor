import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import {AmplifySignOut} from "@aws-amplify/ui-react";
import {Typography} from "@material-ui/core";
import {ProfileRoute, SignInRoute} from "../pages/Pages";
import {Link} from "react-router-dom";
import {useUser} from "../hooks/useUser";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(1),
    },
}));

export default function UserMenu() {
    const classes = useStyles();
    const user = useUser();
    const divRef = useRef();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        handleClose()
    }, [user]);

    const handleClick = () => {
        setAnchorEl(divRef.current);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return user ? (
        <div ref={divRef}>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
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
            <Button className={classes.menuButton} component={Link} to={SignInRoute} color="inherit">Sign in</Button>
        </div>
    );
}