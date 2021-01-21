import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 200,
        margin: "auto",
    },
    media: {
        height: 200,
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
                <Typography gutterBottom variant="headline" component="h2" color={"primary"}>
                    {props.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.description}
                </Typography>
            </CardContent>
        </Card>
    );
}