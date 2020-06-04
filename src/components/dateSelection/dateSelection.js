import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { DatePickerContainer } from './componentStyles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const DateSelection = ({onFromChanged, onToChanged}) => {
  const classes = useStyles();
  return (
      <DatePickerContainer>
        <form className={classes.container} noValidate>
          <TextField
              id="date"
              label="From"
              type="date"
              className={classes.textField}
              onChange={event => onFromChanged({fromDate: event.target.value})}
              InputLabelProps={{shrink: true,}}/>
        </form>
        <form className={classes.container} noValidate>
          <TextField
              id="date"
              label="To"
              type="date"
              className={classes.textField}
              onChange={event => onToChanged({toDate: event.target.value})}
              InputLabelProps={{shrink: true,}}/>
        </form>
      </DatePickerContainer>
  );
};

export default DateSelection;