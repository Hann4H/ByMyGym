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
import firebase from "../firebase";
import "firebase/storage";
import { useForm } from "react-hook-form";



export function MaterialUIPickers(props) {

  const { register, handleSubmit, errors } = useForm();

  const [selectedDate_start, setSelectedDate_start] = React.useState(new Date());
  const [selectedDate_end, setSelectedDate_end] = React.useState(new Date());
  const [selectedTime_start, setSelectedTime_start] = React.useState(new Date());
  const [selectedTime_end, setSelectedTime_end] = React.useState(new Date());
  const [weekday, setWeekday] = React.useState('');
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');



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

  var db = firebase.firestore();
  const ref = db.collection("bookings").doc();

  function onSubmit(e) {
    db.collection("bookings")
      .add({
        gym_id: props.gym_id,
        name,
        surname,
        email,
        phoneNumber,
        weekday,
        selectedDate_start,
        selectedDate_end
      });
  }

 

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>

      <form onSubmit={handleSubmit(onSubmit)} className="gymForm">
      <TextField 
        id="name" 
        label="imię"
        type="text"
        name="name"
        onChange={(e) => setName(e.currentTarget.value)}
        value={name}
        color="secondary" 
        required
        />
      <TextField 
        id="surname" 
        label="nazwisko"
        type="text"
        name="surname"
        onChange={(e) => setSurname(e.currentTarget.value)}
        value={surname}
        color="secondary" 
        required
      />
      <TextField 
        id="email" 
        label="e-mail" 
        type="text"
        name="email"
        onChange={(e) => setEmail(e.currentTarget.value)}
        value={email}
        color="secondary"
        required
      />
      <TextField 
        id="phoneNumber" 
        label="numer telefonu"
        type="text"
        name="phoneNumber"
        onChange={(e) => setPhoneNumber(e.currentTarget.value)}
        value={phoneNumber}
        color="secondary" 
        required
      />
      <Select
          labelId="select-weekday"
          id="weekday"
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
          onChange={setSelectedDate_start}
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
          onChange={setSelectedDate_end}
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
          onChange={setSelectedDate_start}
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
          onChange={setSelectedDate_end}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        <button>Zarezerwuj</button>
        </form>
      </MuiPickersUtilsProvider>
  );
}
