import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const [selectedDate_start, setSelectedDate_start] = React.useState(new Date());
  const [selectedDate_end, setSelectedDate_end] = React.useState(new Date());
  const [selectedTime_start, setSelectedTime_start] = React.useState(new Date());
  const [selectedTime_end, setSelectedTime_end] = React.useState(new Date());
  const [weekday, setWeekday] = React.useState('');


  const handleDateChange_start = (date) => {
    setSelectedDate_start(date);
  };

  const handleDateChange_end = (date) => {
    setSelectedDate_end(date);
  };

  const handleTimeChange_start = (date) => {
    setSelectedTime_start(date);
  };

  const handleTimeChange_end = (date) => {
    setSelectedTime_end(date);
  };

  const handleChange = (event) => {
    setWeekday(event.target.value);
  };


  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
      <div className="booking-grid">
      <TextField id="name" label="imię" />
      <TextField id="surname" label="nazwisko" required/>
      <TextField id="email" label="e-mail" required/>
      <TextField id="number" label="numer telefonu" required/>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={weekday}
          onChange={handleChange}
        >
          <MenuItem value={"Monday"}>Poniedziałek</MenuItem>
          <MenuItem value={"Tuesday"}>Wtorek</MenuItem>
          <MenuItem value={"Wednesday"}>Środa</MenuItem>
          <MenuItem value={"Thursday"}>Czwartek</MenuItem>
          <MenuItem value={"Friday"}>Piątek</MenuItem>
          <MenuItem value={"Saturday"}>Sobota</MenuItem>
          <MenuItem value={"Sunday"}>Niedziela</MenuItem>
        </Select>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date_start"
          label="OD"
          value={selectedDate_start}
          onChange={handleDateChange_start}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date_end"
          label="DO"
          value={selectedDate_end}
          onChange={handleDateChange_end}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          variant="inline"
          margin="normal"
          id="time_start"
          label="OD"
          ampm={false}
          value={selectedDate_start}
          onChange={handleDateChange_start}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        <KeyboardTimePicker
          variant="inline"
          margin="normal"
          id="time_end"
          label="DO"
          ampm={false}
          value={selectedDate_end}
          onChange={handleDateChange_end}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </div>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
