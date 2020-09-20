import React, { Component } from "react";
import { PropTypes } from "prop-types";
import validated from "../ValidatedReservation";
import validate from "../ReservationValidationRules";

import { validateFields } from "../../Validation";
import classnames from "classnames";

import Scheduler, {
  SchedulerData,
  ViewTypes,
  DATE_FORMAT,
  DemoData,
} from "./Scheduler";

import { ConfigProvider } from "antd";
import plPL from "antd/es/locale/pl_PL";

import firebase from "firebase";
const db = firebase.firestore();

class Basic extends Component {
  constructor(props) {
    super(props);

    let schedulerData = new SchedulerData(new Date(), ViewTypes.Week);
    schedulerData.localeMoment.locale("pl");
    schedulerData.setResources(DemoData.resources);
    schedulerData.setEvents(DemoData.events);
    this.state = {
      viewModel: schedulerData,
      values: {},
      errors: {},
      name: { value: "", validateOnChange: false, error: "" },
      surname: { value: "", validateOnChange: false, error: "" },
      phoneNumber: { value: "", validateOnChange: false, error: "" },
      email: { value: "", validateOnChange: false, error: "" },
      submitCalled: false,
      allFieldsValidated: false,
    };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  //********** */

  prevClick = (schedulerData) => {
    schedulerData.prev();
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData,
    });
  };

  nextClick = (schedulerData) => {
    schedulerData.next();
    schedulerData.setEvents(DemoData.events);
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
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData,
    });
  };

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(DemoData.events);
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
    if (
      window.confirm(
        `Chcesz wybrać datę / czas?`
        // {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}
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

      // setErrors({});
      // setErrors(validate(values));
      // setIsSubmitting(true);

      db.collection("reservation")
        .add({
          id: newEvent.id,
          title: "Do akceptacji",
          start: newEvent.start,
          end: newEvent.end,
          resourceId: newEvent.resourceId,
          bgColor: "#FFD700",
          gym_id: this.props.gym_id,
          reservation_date: new Date().toISOString(),
          name: this.state.name.value,
          surname: this.state.surname.value,
          email: this.state.email.value,
          phoneNumber: this.state.phoneNumber.value,
        })
        .then(() => {
          window.location.reload();
        });
      // insert stuff from booking
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
      schedulerData.setEvents(DemoData.events);
      this.setState({
        viewModel: schedulerData,
      });

      schedulerContent.scrollLeft = maxScrollLeft - 10;
    }
  };

  onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.prev();
      schedulerData.setEvents(DemoData.events);
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

  // new changes 20.09

  // handleChange(event) {
  //   this.setState({ name: event.target.name });
  // }

  // handleSubmit(event) {
  //   alert("Wysłano następujące wypracowanie: " + this.state.value);
  //   event.preventDefault();
  // }

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

      // clear state and show all fields are validated
      this.setState({ allFieldsValidated: true });
      // this.setState({ ...initialState, allFieldsValidated: true });
      // this.showAllFieldsValidated();
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

  // showAllFieldsValidated() {
  //   setTimeout(() => {
  //     this.setState({ allFieldsValidated: false });
  //   }, 1500);
  // }

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
        <div>
          {/* <form onSubmit={this.handleSubmit}>
            <label>
              Wypracowanie:
              <textarea value={this.state.name} onChange={this.handleChange} />
            </label> */}

          <div className="Form col-md-8 col-lg-6">
            <div className="card shadow">
              <div className="card-body">
                {/* Form Starts Here */}
                <form onSubmit={(evt) => this.handleSubmit(evt)}>
                  {/* Name field */}
                  <div className="form-group">
                    <label>Imię</label>
                    <input
                      type="text"
                      name="name"
                      value={name.value}
                      placeholder="Wprowadź imię"
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
                    />
                    <div className="invalid-feedback">{name.error}</div>
                  </div>

                  {/* Surname field */}
                  <div className="form-group">
                    <label>Nazwisko</label>
                    <input
                      type="text"
                      name="surname"
                      value={surname.value}
                      placeholder="Wprowadź nazwisko"
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
                    />
                    <div className="invalid-feedback">{surname.error}</div>
                  </div>

                  {/* Email field */}
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="text"
                      name="email"
                      value={email.value}
                      placeholder="Wprowadź email"
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
                    />
                    <div className="invalid-feedback">{email.error}</div>
                  </div>

                  {/* phoneNumber field */}
                  <div className="form-group">
                    <label>Telefon</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={phoneNumber.value}
                      placeholder="Wprowadź telefon"
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
                    />
                    <div className="invalid-feedback">{phoneNumber.error}</div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-secondary btn-block"
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Basic;
