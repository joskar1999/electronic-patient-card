import React, { useDebugValue } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    margin: 12
  },
  title: {
    fontSize: 14,
    display: 'inline-block',
    marginRight: 16
  },
});

const PatientCard = (props) => {
  const classes = useStyles();
  return (
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} variant="h6" gutterBottom>
            Name: {props.firstName} {props.surname}
          </Typography>
          <Typography className={classes.title} variant="h6" gutterBottom>
            Birth date: {props.birthDate}
          </Typography>
          <Typography className={classes.title} variant="h6" gutterBottom>
            Phone number: {props.telecom[0].value}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Show details</Button>
        </CardActions>
      </Card>
  );
};

export default PatientCard;