import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
    root: {
        maxWidth: 225,
        margin: "auto",
    },
    media: {
        height: 175,
        paddingTop: '25%',
    },
});

export default function HowToCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} elevation={0}>
            <CardMedia
                className={classes.media}
                image={props.icon}
            />
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