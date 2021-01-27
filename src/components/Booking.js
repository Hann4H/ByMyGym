import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import firebase from "../firebase";
import "firebase/storage";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import "moment/locale/pl";
import Basic from "../components/calendar/Basic";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import GetBookingData from "../components/calendar/GetBookingData";
import { set } from "date-fns";

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

  const { register, handleSubmit} = useForm();

  const [selectedDate_start, setSelectedDate_start] = React.useState(
    new Date()
  );
  const [selectedDate_end, setSelectedDate_end] = React.useState(new Date());
  const [weekday, setWeekday] = React.useState("");
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const [user_id, setUser_id] = React.useState({});

  var db = firebase.firestore();

  function onSubmit(e) {
    db.collection("bookings").add({
      gym_id: props.gym_id,
      name,
      surname,
      email,
      phoneNumber,
    });
    // console.log(
    //   getDaysBetweenDates(
    //     new Date(selectedDate_start),
    //     new Date(selectedDate_end),
    //     weekday
    //   )
    );
  }

  function getDaysBetweenDates(start, end, dayName) {
    var result = [];
    var days = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
    var day = days[dayName.toLowerCase().substr(0, 3)];
    var current = new Date(start);
    current.setDate(current.getDate() + ((day - current.getDay() + 7) % 7));
    while (current < end) {
      result.push(new Date(+current));
      current.setDate(current.getDate() + 7);
    }
    return result;
  }

  return (
    <div className="type-button">
      <div>
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
                        onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                        value={phoneNumber}
                        fullWidth
                        required
                      />
                    </div>
                    <div className="calendar-position">
                      <GetBookingData gym_id={props.gym_id} />
                      <DndProvider backend={HTML5Backend}>
                        <Basic
                          gym_id={props.gym_id}
                          name={name}
                          surname={surname}
                          phoneNumber={phoneNumber}
                          email={email}
                        />
                      </DndProvider>
                    </div>
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
      </div>
    </div>
  );
}
