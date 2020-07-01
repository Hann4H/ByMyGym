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
import Modal from 'react-modal';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

Modal.setAppElement('#root');
const customStyles = {
  content : {
    width: '19rem',
    height: 'auto',
    color: 'black',
    top: '50%',
    bottom: 'auto',
    marginLeft : '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '1rem',
    fontFamily: 'Arial'
  }
};

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffb967',
      main: '#ffa841',
      dark: '#ff8119',
      contrastText: '#fff',
    },
  },
});

export function MaterialUIPickers(props) {

  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal(){
    setIsOpen(false);
  }

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
        selectedDate_end,
        dates: (getDaysBetweenDates(
          new Date(selectedDate_start),
          new Date(selectedDate_end),
          weekday))
      });
      console.log(getDaysBetweenDates(
        new Date(selectedDate_start),
        new Date(selectedDate_end),
        weekday))
  }

  function getDaysBetweenDates(start, end, dayName) {
    var result = [];
    var days = {sun:0,mon:1,tue:2,wed:3,thu:4,fri:5,sat:6};
    var day = days[dayName.toLowerCase().substr(0,3)];
    // Copy start date
    var current = new Date(start);
    // Shift to next of required days
    current.setDate(current.getDate() + (day - current.getDay() + 7) % 7);
    // While less than end date, add dates to result array
    while (current < end) {
      result.push(new Date(+current));
      current.setDate(current.getDate() + 7);
    }
    return result;  
  }

 

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="booking-container">
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="flex-start"
      >
        <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit(onSubmit)} className="gymForm">
      <div className="larger-field">
      <div className="booking-field">
      <TextField 
        id="name" 
        label="imię"
        type="text"
        name="name"
        onChange={(e) => setName(e.currentTarget.value)}
        value={name}
        required
        />
        </div>
        <div className="booking-field">
      <TextField 
        id="surname" 
        label="nazwisko"
        type="text"
        name="surname"
        onChange={(e) => setSurname(e.currentTarget.value)}
        value={surname}
        required
      />
      </div>
        <div className="booking-field">
      <TextField 
        id="email" 
        label="e-mail" 
        type="text"
        name="email"
        onChange={(e) => setEmail(e.currentTarget.value)}
        value={email}
        color="primary"
        required
      />
      </div>
        <div className="booking-field">
      <TextField 
        id="phoneNumber" 
        label="numer telefonu"
        type="text"
        name="phoneNumber"
        pattern="(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)"
        onChange={(e) => setPhoneNumber(e.currentTarget.value)}
        value={phoneNumber}
        required
      />
      </div>
        <div className="booking-field" id="booking-weekday">
      <Select
          labelId="select-weekday"
          id="weekday"
          label="dzień tygodnia"
          placeholder="dzień tygodnia"
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
        </div>
        </div>
        <div className="booking-field">
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
        </div>
        <div className="booking-field">
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
        </div>
        <div className="booking-field">
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
        </div>
        <div className="booking-field">
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
        </div>

        <button className="booking-button" onClick={openModal}>Zarezerwuj</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="dasds"
        >Sala została zarezerwowana<button onClick={closeModal}>x</button></Modal>
        </form>
        </ThemeProvider>
        </Grid>
        </div>
      </MuiPickersUtilsProvider>
  );
}
