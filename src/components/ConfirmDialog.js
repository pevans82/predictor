import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 800,
        width: '100vw',
        margin: "auto",
    },
    head: {
        background: "linear-gradient(#BE1D2C, #FFF)",
        padding: theme.spacing(1),
        marginBottom: theme.spacing(3),
        color: "#FFF",
        textAlign: "center",
    },
    buttons: {
        margin: "auto",
    },
}));

export function ConfirmDialog(props) {
    const classes = useStyles();

    const {title, children, open, setOpen, onConfirm} = props;

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="confirm-dialog"
        >
            <DialogTitle className={classes.head}  id="confirm-dialog">{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions className={classes.buttons}>
                <Button
                    variant="contained"
                    onClick={() => setOpen(false)}
                    color="secondary"
                >
                    No
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        setOpen(false);
                        onConfirm();
                    }}
                    color="primary"
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};