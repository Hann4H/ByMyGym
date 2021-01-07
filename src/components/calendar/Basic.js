import React, { Component } from "react";
import { validateFields } from "../../Validation";
import classnames from "classnames";
import Scheduler, { SchedulerData, ViewTypes } from "./Scheduler";
import { ConfigProvider, DatePicker } from "antd";
import plPL from "antd/es/locale/pl_PL";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import firebase from "firebase";
const db = firebase.firestore();

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

const { RangePicker } = DatePicker;

class Basic extends Component {
  constructor(props) {
    super(props);

    let schedulerData = new SchedulerData(new Date(), ViewTypes.Day);

    schedulerData.localeMoment.locale("pl");
    this.state = {
      user: [],
      viewModel: schedulerData,
      dateRange: null,
      values: {},
      errors: {},
      name: { value: "", validateOnChange: false, error: "" },
      surname: { value: "", validateOnChange: false, error: "" },
      phoneNumber: { value: "", validateOnChange: false, error: "" },
      email: { value: "", validateOnChange: false, error: "" },
      submitCalled: false,
      allFieldsValidated: false,
      DemoData: {
        resources: [
          {
            id: "r0",
            name: "",
            groupOnly: true,
          },
          {
            id: "r1",
            name: "Rezerwacja",
          },
        ],
        events: [],
      },
    };
    schedulerData.setResources(this.state.DemoData.resources);
    schedulerData.setEvents(this.state.DemoData.events);
  }

  componentDidMount() {
    let today = new Date()
    
    db.collection("reservation")
      .where("gym_id", "==", this.props.gym_id)
      .get()
      .then((items) => {
        const events = items.docs.map((doc) => {
          return { docId: doc.id, ...doc.data() };
        });
        const user = localStorage.getItem("user");
        this.setState({ user });
        const eventsData = JSON.stringify(events, null, 4);
        this.setState((events) => ({
          DemoData: {
            events: JSON.parse(eventsData),
          },
        }));
      });
  }

  //***********/

  prevClick = (schedulerData) => {
    schedulerData.prev();
    schedulerData.setEvents(this.state.DemoData.events);
    this.setState({
      viewModel: schedulerData,
    });
  };

  nextClick = (schedulerData) => {
    schedulerData.next();
    schedulerData.setEvents(this.state.DemoData.events);
    this.setState({
      viewModel: schedulerData,
    });
  };

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    );
    schedulerData.setEvents(this.state.DemoData.events);
    this.setState({
      viewModel: schedulerData,
    });
  };

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(this.state.DemoData.events);
    this.setState({
      viewModel: schedulerData,
    });
  };

  eventClicked = (schedulerData, event) => {
    alert(
      `You just clicked an event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  ops1 = (schedulerData, event) => {
    alert(
      `You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  ops2 = (schedulerData, event) => {
    alert(
      `You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    let today = new Date();
    let startDate = new Date(start);
    let endDate = new Date(end);

    if (startDate < today) {
      alert("Początkowa data nie może być z przeszłości!");
    } else {
      if(startDate.getDate() + "." + startDate.getMonth()+1 + "." + startDate.getFullYear() == endDate.getDate() + "." + endDate.getMonth()+1 + "." + endDate.getFullYear()) {
        console.log("ten sam dzień")
        if (
          window.confirm(
            `Chcesz zarezerwować termin / czas? \nOd ${start} do ${end}`
          )
        ) {
          let newFreshId = 0;
          schedulerData.events.forEach((item) => {
            if (item.id >= newFreshId) newFreshId = item.id + 1;
          });
  
          let newEvent = {
            id: newFreshId,
            title: "Do akceptacji",
            start: start,
            end: end,
            resourceId: slotId,
            bgColor: "#FFD700",
          };
  
          schedulerData.addEvent(newEvent);
          this.setState({
            viewModel: schedulerData,
          });
  
          db.collection("reservation")
            .add({
              id: newEvent.id,
              title: "Do akceptacji",
              start: newEvent.start,
              end: newEvent.end,
              resourceId: newEvent.resourceId,
              bgColor: "#FFD700",
              movable: false,
              resizable: false,
              gym_id: this.props.gym_id,
              reservation_date: new Date().toISOString(),
              name: this.state.name.value,
              surname: this.state.surname.value,
              email: this.state.email.value,
              phoneNumber: this.state.phoneNumber.value,
              user_id: this.state.user,
              scored: null,
            })
            .then(() => {
              window.location.reload();
              window.location.replace("http://localhost:3000/finishReservation");
            });
        }
      } else {
        console.log("nie ten sam dzień")
        if (
          window.confirm(
            `Chcesz zarezerwować termin / czas? \nOd ${start} do ${end}`
          )
        ) {
          let newFreshId = 0;
          schedulerData.events.forEach((item) => {
            if (item.id >= newFreshId) newFreshId = item.id + 1;
          });
  
          let newEvent = {
            id: newFreshId,
            title: "Do akceptacji",
            start: start,
            end: end,
            resourceId: slotId,
            bgColor: "#FFD700",
          };
  
          schedulerData.addEvent(newEvent);
          this.setState({
            viewModel: schedulerData,
          });
  
          db.collection("reservation")
            .add({
              id: newEvent.id,
              title: "Do akceptacji",
              start: newEvent.start,
              end: newEvent.end,
              resourceId: newEvent.resourceId,
              bgColor: "#FFD700",
              movable: false,
              resizable: false,
              gym_id: this.props.gym_id,
              reservation_date: new Date().toISOString(),
              name: this.state.name.value,
              surname: this.state.surname.value,
              email: this.state.email.value,
              phoneNumber: this.state.phoneNumber.value,
              user_id: this.state.user,
              scored: null,
            })
            .then(() => {
              window.location.reload();
              window.location.replace("http://localhost:3000/finishReservation");
            });
        }
      }

      





    }
  };

  updateEventStart = (schedulerData, event, newStart) => {
    if (
      window.confirm(
        `Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`
      )
    ) {
      schedulerData.updateEventStart(event, newStart);
    }
    this.setState({
      viewModel: schedulerData,
    });
  };

  updateEventEnd = (schedulerData, event, newEnd) => {
    if (
      window.confirm(
        `Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`
      )
    ) {
      schedulerData.updateEventEnd(event, newEnd);
    }
    this.setState({
      viewModel: schedulerData,
    });
  };

  moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    if (
      window.confirm(
        `Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`
      )
    ) {
      schedulerData.moveEvent(event, slotId, slotName, start, end);
      this.setState({
        viewModel: schedulerData,
      });
    }
  };

  onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.next();
      schedulerData.setEvents(this.state.DemoData.events);
      this.setState({
        viewModel: schedulerData,
      });

      schedulerContent.scrollLeft = maxScrollLeft - 10;
    }
  };

  onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.prev();
      schedulerData.setEvents(this.state.DemoData.events);
      this.setState({
        viewModel: schedulerData,
      });

      schedulerContent.scrollLeft = 10;
    }
  };

  onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log("onScrollTop");
  };

  onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log("onScrollBottom");
  };

  toggleExpandFunc = (schedulerData, slotId) => {
    schedulerData.toggleExpandStatus(slotId);
    this.setState({
      viewModel: schedulerData,
    });
  };

  onChangeRangePicker = (value, dateString) => {
    let date = this.state.dateRange;
    date.push(value);
    this.setState({ dateRange: date });
    console.log("Selected Time: ", date);
  };

  /*
   * validates the field onBlur if sumbit button is not clicked
   * set the validateOnChange to true for that field
   * check for error
   */
  handleBlur(validationFunc, evt) {
    const field = evt.target.name;
    // validate onBlur only when validateOnChange for that field is false
    // because if validateOnChange is already true there is no need to validate onBlur
    if (
      this.state[field]["validateOnChange"] === false &&
      this.state.submitCalled === false
    ) {
      this.setState((state) => ({
        [field]: {
          ...state[field],
          validateOnChange: true,
          error: validationFunc(state[field].value),
        },
      }));
    }
    return;
  }

  /*
   * update the value in state for that field
   * check for error if validateOnChange is true
   */
  handleChange(validationFunc, evt) {
    const field = evt.target.name;
    const fieldVal = evt.target.value;
    this.setState((state) => ({
      [field]: {
        ...state[field],
        value: fieldVal,
        error: state[field]["validateOnChange"] ? validationFunc(fieldVal) : "",
      },
    }));
  }

  /*
   * validate all fields
   * check if all fields are valid if yes then submit the Form
   * otherwise set errors for the feilds in the state
   */
  handleSubmit(evt) {
    evt.preventDefault();
    // validate all fields
    const { email, name, surname, phoneNumber } = this.state;
    const emailError = validateFields.validateEmail(email.value);
    const nameError = validateFields.validateName(name.value);
    const surnameError = validateFields.validateSurname(surname.value);
    const phoneNumberError = validateFields.validatePhoneNumber(
      phoneNumber.value
    );

    if (
      [emailError, nameError, surnameError, phoneNumberError].every(
        (e) => e === false
      )
    ) {
      // no errors submit the form
      console.log("success");
      this.setState({ allFieldsValidated: true });
    } else {
      // update the state with errors
      this.setState((state) => ({
        email: {
          ...state.email,
          validateOnChange: true,
          error: emailError,
        },
        name: {
          ...state.name,
          validateOnChange: true,
          error: nameError,
        },
        surname: {
          ...state.surname,
          validateOnChange: true,
          error: surnameError,
        },
        phoneNumber: {
          ...state.phoneNumber,
          validateOnChange: true,
          error: phoneNumberError,
        },
      }));
    }
  }

  render() {
    const { viewModel } = this.state;
    const {
      email,
      name,
      surname,
      phoneNumber,
      allFieldsValidated,
    } = this.state;

    return (
      <div style={{ backgroundColor: "white" }}>
        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
          <div className="booking-container">
            {/* <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-start"
            > */}
              {/* <ThemeProvider theme={theme}> */}
                <form
                  onSubmit={(evt) => this.handleSubmit(evt)}
                  className="gymForm"
                >
                  <h3
                    style={{ textAlign: "center", color: "var(--darkOrange)" }}
                  >
                    Rezerwacja
                  </h3>
                  {/* Name field */}
                  <div className="form-group">
                      <label className="form-group-label">imię</label>
											<input
                      label="imię"
                      type="text"
                      name="name"
                      value={name.value}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        size: 30,
                      }}
                      floatingLabelFixed={true}
                      className={classnames(
                        "form-control",
                        { "is-valid": name.error === false },
                        { "is-invalid": name.error }
                      )}
                      onChange={(evt) =>
                        this.handleChange(validateFields.validateName, evt)
                      }
                      onBlur={(evt) =>
                        this.handleBlur(validateFields.validateName, evt)
                      }
                      required
                    />
                    <div className="invalid-feedback">{name.error}</div>
                  </div>
                  {/* Surname field */}
                  <div className="form-group">
                      <label className="form-group-label">nazwisko</label>
											<input
                      label="nazwisko"
                      type="text"
                      name="surname"
                      value={surname.value}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        size: 30,
                      }}
                      className={classnames(
                        "form-control",
                        { "is-valid": surname.error === false },
                        { "is-invalid": surname.error }
                      )}
                      onChange={(evt) =>
                        this.handleChange(validateFields.validateSurname, evt)
                      }
                      onBlur={(evt) =>
                        this.handleBlur(validateFields.validateSurname, evt)
                      }
                      required
                    />
                    <div className="invalid-feedback">{surname.error}</div>
                  </div>
                  {/* Email field */}
                  <div className="form-group">
                    <label className="form-group-label">Email</label>
											<input
                      label="Email"
                      type="text"
                      name="email"
                      value={email.value}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        size: 30,
                      }}
                      className={classnames(
                        "form-control",
                        { "is-valid": email.error === false },
                        { "is-invalid": email.error }
                      )}
                      onChange={(evt) =>
                        this.handleChange(validateFields.validateEmail, evt)
                      }
                      onBlur={(evt) =>
                        this.handleBlur(validateFields.validateEmail, evt)
                      }
                      required
                    />
                    <div className="invalid-feedback">{email.error}</div>
                  </div>
                  {/* phoneNumber field */}
                  <div className="form-group">
                      <label className="form-group-label">Telefon</label>
											<input
                      label="Telefon"
                      type="text"
                      name="phoneNumber"
                      value={phoneNumber.value}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        size: 30,
                      }}
                      className={classnames(
                        "form-control",
                        { "is-valid": phoneNumber.error === false },
                        { "is-invalid": phoneNumber.error }
                      )}
                      onChange={(evt) =>
                        this.handleChange(
                          validateFields.validatePhoneNumber,
                          evt
                        )
                      }
                      onBlur={(evt) =>
                        this.handleBlur(validateFields.validatePhoneNumber, evt)
                      }
                      required
                    />
                    <div className="invalid-feedback">{phoneNumber.error}</div>
                  </div>
                  <br />
                  <button
                    type="submit"
                    className="booking-button"
                    onMouseDown={() => this.setState({ submitCalled: true })}
                    value="Wybierz termin"
                  >
                    Wybierz przedział czasowy
                  </button>
                  <br />
                  {allFieldsValidated && (
                    <ConfigProvider locale={plPL}>
                      <Scheduler
                        schedulerData={viewModel}
                        prevClick={this.prevClick}
                        nextClick={this.nextClick}
                        onSelectDate={this.onSelectDate}
                        onViewChange={this.onViewChange}
                        eventItemClick={this.eventClicked}
                        viewEventClick={this.ops1}
                        viewEventText="Ops 1"
                        viewEvent2Text="Ops 2"
                        viewEvent2Click={this.ops2}
                        updateEventStart={this.updateEventStart}
                        updateEventEnd={this.updateEventEnd}
                        moveEvent={this.moveEvent}
                        newEvent={this.newEvent}
                        onScrollLeft={this.onScrollLeft}
                        onScrollRight={this.onScrollRight}
                        onScrollTop={this.onScrollTop}
                        onScrollBottom={this.onScrollBottom}
                        toggleExpandFunc={this.toggleExpandFunc}
                      />
                    </ConfigProvider>
                  )}
                  <br />
                  {/* TODO jeszcze to będę robić */}
                  {/* <ConfigProvider locale={plPL}>
                    <RangePicker
                      renderExtraFooter={() => "extra footer"}
                      onChange={this.onChangeRangePicker}
                    />
                  </ConfigProvider> */}
                </form>
              {/* </ThemeProvider> */}
            {/* </Grid> */}
          </div>
        {/* </MuiPickersUtilsProvider> */}
      </div>
    );
  }
}

export default Basic;
