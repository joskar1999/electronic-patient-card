import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

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

const PatientCard = ({firstName, surname, birthDate, telecom, id}) => {
  const classes = useStyles();
  return (
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} variant="h6" gutterBottom>
            Name: {firstName} {surname}
          </Typography>
          <Typography className={classes.title} variant="h6" gutterBottom>
            Birth date: {birthDate}
          </Typography>
          <Typography className={classes.title} variant="h6" gutterBottom>
            Phone number: {telecom}
          </Typography>
        </CardContent>
        <CardActions>
          {id ? <Link to={`/patients/${id}`} style={{textDecoration: 'none'}}>
                <Button size="small">Show details</Button>
              </Link>
              : null}
        </CardActions>
      </Card>
  );
};

export default PatientCard;