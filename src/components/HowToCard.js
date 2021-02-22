import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Help from "@material-ui/icons/Help";
import SportsRugby from "@material-ui/icons/SportsRugby";
import Stars from "@material-ui/icons/Stars";

const useStyles = makeStyles({
    root: {
        maxWidth: 225,
        margin: "auto",
    },
    icon: {
        fontSize: 150,
    },
});

export default function HowToCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} elevation={0}>
            {props.icon === "account" && <AccountCircle className={classes.icon}/>}
            {props.icon === "question" && <Help className={classes.icon}/>}
            {props.icon === "rugby" && <SportsRugby className={classes.icon}/>}
            {props.icon === "star" && <Stars className={classes.icon}/>}
            <CardContent>
                <Typography gutterBottom variant="h5" color={"primary"}>
                    <Box fontWeight="fontWeightBold">
                        {props.title}
                    </Box>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.description}
                </Typography>
            </CardContent>
        </Card>
    );
}