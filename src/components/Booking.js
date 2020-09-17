import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  TimePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
// import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import firebase from "../firebase";
import "firebase/storage";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Calendar } from "./Calendar";
import { startTimeSelectOptions, endTimeSelectOptions } from "./BookingHelpers";
import Select from "react-select";
import "moment/locale/pl";

Modal.setAppElement("#root");
const customStyles = {
  content: {
    width: "19rem",
    height: "auto",
    color: "green",
    top: "50%",
    bottom: "auto",
    marginLeft: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    fontSize: "1rem",
    fontFamily: "Arial",
  },
};

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ffb967",
      main: "#ffa841",
      dark: "#ff8119",
      contrastText: "#fff",
    },
  },
});

export function MaterialUIPickers(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const { register, handleSubmit, errors } = useForm();

  const [selectedDate_start, setSelectedDate_start] = React.useState(
    new Date()
  );
  const [selectedDate_end, setSelectedDate_end] = React.useState(new Date());
  const [selectedTime_start, setSelectedTime_start] = React.useState("08:00");
  const [selectedTime_end, setSelectedTime_end] = React.useState("09:00");
  const [weekday, setWeekday] = React.useState("");
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [showingShort, setShowingShort] = React.useState(false);
  const [showingLong, setShowingLong] = React.useState(false);

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

  const handleWeekday = (date) => {
    setWeekday(date);
  };

  const handleChange = (event) => {
    setWeekday(event.target.value);
  };

  const handleChangeStart = (event) => {
    setSelectedTime_start(event.target.value);
  };

  const handleChangeEnd = (event) => {
    setSelectedTime_end(event.target.value);
  };

  var db = firebase.firestore();
  const ref = db.collection("bookings").doc();

  function onSubmit(e) {
    db.collection("bookings").add({
      gym_id: props.gym_id,
      name,
      surname,
      email,
      phoneNumber,
      weekday,
      selectedDate_start,
      selectedDate_end,
      selectedTime_start,
      selectedTime_end,
      dates: getDaysBetweenDates(
        new Date(selectedDate_start),
        new Date(selectedDate_end),
        weekday
      ),
    });
    console.log(
      getDaysBetweenDates(
        new Date(selectedDate_start),
        new Date(selectedDate_end),
        weekday
      )
    );
  }

  function handleValidation() {}

  function getDaysBetweenDates(start, end, dayName) {
    var result = [];
    var days = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
    var day = days[dayName.toLowerCase().substr(0, 3)];
    // Copy start date
    var current = new Date(start);
    // Shift to next of required days
    current.setDate(current.getDate() + ((day - current.getDay() + 7) % 7));
    // While less than end date, add dates to result array
    while (current < end) {
      result.push(new Date(+current));
      current.setDate(current.getDate() + 7);
    }
    return result;
  }

  return (
    <div className="type-button">
      <div>
        <button
          className="showing-button"
          onClick={() => setShowingLong({ showingLong: !showingLong })}
        >
          Rezerwacja długoterminowa
        </button>
        {showingLong ? (
          <div>
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
                      <div className="booking-field">
                        <TextField
                          id="name"
                          label="imię"
                          type="text"
                          name="name"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setName(e.currentTarget.value)}
                          value={name}
                          fullWidth
                          required
                        />
                      </div>

                      <div className="booking-field">
                        <TextField
                          id="surname"
                          label="nazwisko"
                          type="text"
                          name="surname"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setSurname(e.currentTarget.value)}
                          value={surname}
                          fullWidth
                          required
                        />
                      </div>

                      <div className="booking-field">
                        <TextField
                          id="email"
                          label="e-mail"
                          type="text"
                          name="email"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setEmail(e.currentTarget.value)}
                          value={email}
                          color="primary"
                          ref={register({
                            required: "Required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "zły email",
                            },
                          })}
                          fullWidth
                          required
                        />
                      </div>

                      <div className="booking-field">
                        <TextField
                          id="phoneNumber"
                          label="numer telefonu"
                          type="text"
                          name="phoneNumber"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          pattern="(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)"
                          onChange={(e) =>
                            setPhoneNumber(e.currentTarget.value)
                          }
                          value={phoneNumber}
                          fullWidth
                          required
                        />
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
                            "aria-label": "change date",
                          }}
                          fullWidth
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
                            "aria-label": "change date",
                          }}
                          fullWidth
                        />
                      </div>

                      {/* <div className="booking-field" id="booking-weekday">
                        <p>Wybierz dzień tygodnia</p>
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
                      </div> */}

                      <div className="booking-field">
                        <Select
                          isMulti
                          theme={(theme) => ({
                            ...theme,
                            colors: {
                              ...theme.colors,
                              primary: "#ffa841",
                              primary25: "#ffb967",
                            },
                          })}
                          placeholder="Dzień tygodnia"
                          value={weekday}
                          onChange={handleWeekday}
                          options={[
                            { value: "monday", label: "Poniedziałek" },
                            { value: "tuesday", label: "Wtorek" },
                            { value: "wednesday", label: "Środa" },
                            { value: "thursday", label: "Czwartek" },
                            { value: "friday", label: "Piątek" },
                            { value: "saturday", label: "Sobota" },
                            { value: "sunday", label: "Niedziela" },
                          ]}
                        />
                      </div>

                      <div className="booking-field">
                        <Select
                          theme={(theme) => ({
                            ...theme,
                            colors: {
                              ...theme.colors,
                              primary: "#ffa841",
                              primary25: "#ffb967",
                            },
                          })}
                          placeholder="Od"
                          value={selectedTime_start}
                          onChange={setSelectedTime_start}
                          options={[
                            { value: "8:00", label: "8:00" },
                            { value: "9:00", label: "9:00" },
                            { value: "10:00", label: "10:00" },
                            { value: "11:00", label: "11:00" },
                            { value: "12:00", label: "12:00" },
                            { value: "13:00", label: "13:00" },
                            { value: "14:00", label: "14:00" },
                            { value: "15:00", label: "15:00" },
                            { value: "16:00", label: "16:00" },
                            { value: "17:00", label: "17:00" },
                            { value: "18:00", label: "18:00" },
                            { value: "19:00", label: "19:00" },
                            { value: "20:00", label: "20:00" },
                          ]}
                        />
                      </div>

                      <div className="booking-field">
                        <Select
                          theme={(theme) => ({
                            ...theme,
                            colors: {
                              ...theme.colors,
                              primary: "#ffa841",
                              primary25: "#ffb967",
                            },
                          })}
                          placeholder="Do"
                          value={selectedTime_end}
                          onChange={setSelectedTime_end}
                          options={[
                            { value: "9:00", label: "9:00" },
                            { value: "10:00", label: "10:00" },
                            { value: "11:00", label: "11:00" },
                            { value: "12:00", label: "12:00" },
                            { value: "13:00", label: "13:00" },
                            { value: "14:00", label: "14:00" },
                            { value: "15:00", label: "15:00" },
                            { value: "16:00", label: "16:00" },
                            { value: "17:00", label: "17:00" },
                            { value: "18:00", label: "18:00" },
                            { value: "19:00", label: "19:00" },
                            { value: "20:00", label: "20:00" },
                            { value: "21:00", label: "21:00" },
                          ]}
                        />
                      </div>

                      {/* <div className="booking-field">
                        <TimePicker
                          clearable
                          helperText={''}
                          id="time"
                          label="Od"
                          // type="time"
                          ampm={false}
                          value={selectedTime_start}
                          onChange={setSelectedTime_start}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </div>

                      <div className="booking-field">
                        <TimePicker
                          clearable
                          helperText={''}
                          id="time"
                          label="Do"
                          // type="time"
                          ampm={false}
                          value={selectedTime_end}
                          onChange={setSelectedTime_end}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </div> */}

                      <button className="booking-button" onClick={openModal}>
                        ZAREZERWUJ
                      </button>
                      <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="dasds"
                      >
                        Sala została zarezerwowana
                        <button onClick={closeModal}>x</button>
                      </Modal>
                    </form>
                  </ThemeProvider>
                </Grid>
              </div>
            </MuiPickersUtilsProvider>
          </div>
        ) : null}
      </div>

      <div>
        <button
          className="showing-button"
          onClick={() => setShowingShort({ showingShort: !showingShort })}
        >
          Rezerwacja krótkoterminowa
        </button>
        {showingShort ? (
          <div>
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
                      <div className="booking-field">
                        <TextField
                          id="name"
                          label="imię"
                          type="text"
                          name="name"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setName(e.currentTarget.value)}
                          value={name}
                          fullWidth
                          required
                        />
                      </div>

                      <div className="booking-field">
                        <TextField
                          id="surname"
                          label="nazwisko"
                          type="text"
                          name="surname"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setSurname(e.currentTarget.value)}
                          value={surname}
                          fullWidth
                          required
                        />
                      </div>

                      <div className="booking-field">
                        <TextField
                          id="email"
                          label="e-mail"
                          type="text"
                          name="email"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setEmail(e.currentTarget.value)}
                          value={email}
                          color="primary"
                          fullWidth
                          required
                        />
                      </div>

                      <div className="booking-field">
                        <TextField
                          id="phoneNumber"
                          label="numer telefonu"
                          type="text"
                          name="phoneNumber"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          pattern="(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)"
                          onChange={(e) =>
                            setPhoneNumber(e.currentTarget.value)
                          }
                          value={phoneNumber}
                          fullWidth
                          required
                        />
                      </div>

                      {/* <div className="calendar-style">
                        <Calendar gymId={props.gym_id} />
                      </div> */}

                      <button className="booking-button" onClick={openModal}>
                        ZAREZERWUJ
                      </button>
                      <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="dasds"
                      >
                        Sala została zarezerwowana
                        <button className="button" onClick={closeModal}>x</button>
                      </Modal>
                    </form>
                  </ThemeProvider>
                </Grid>
              </div>
            </MuiPickersUtilsProvider>
          </div>
        ) : null}
      </div>
    </div>
  );
}
