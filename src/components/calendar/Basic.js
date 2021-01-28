import React, { Component } from "react";
import { validateFields } from "../../Validation";
import classnames from "classnames";
import Scheduler, { SchedulerData, ViewTypes } from "./Scheduler";
import { ConfigProvider, DatePicker, Space } from "antd";
import plPL from "antd/es/locale/pl_PL";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import firebase from "firebase";
import axios from "axios";
import RangePickerForGym from "../gymRangePicker/RangePickerForGym";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { TimePicker } from "antd";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Cookies from "js-cookie"

import createBrowserHistory from "history/createBrowserHistory";

const history = createBrowserHistory();
const { RangePicker } = TimePicker;

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

class Basic extends Component {
	constructor(props) {
		super(props);

		let schedulerData = new SchedulerData(new Date(), ViewTypes.Day);

		schedulerData.localeMoment.locale("pl");
		this.state = {
			ownerMail: "",
			gymName: "",
			user: [],
			viewModel: schedulerData,
			dateRange: 0,
			values: {},
			errors: {},
			view: 0,
			times: [],
			name: { value: "", validateOnChange: false, error: "" },
			surname: { value: "", validateOnChange: false, error: "" },
			phoneNumber: { value: "", validateOnChange: false, error: "" },
			email: { value: "", validateOnChange: false, error: "" },
			submitCalled: false,
			allFieldsValidated: false,
			youAdmin: false,
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
		db.collection("reservation")
			.where("gym_id", "==", this.props.gym_id)
			.get()
			.then((items) => {
				const events = items.docs.map((doc) => {
					return { docId: doc.id, ...doc.data() };
				});
				const user = Cookies.get('user');
				this.setState({ user });
				const eventsData = JSON.stringify(events, null, 4);
				this.setState((events) => ({
					DemoData: {
						events: JSON.parse(eventsData),
					},
				}));
				history.push(`/gym_profile/${this.props.gym_id}`);
			});

		db.collection("gyms")
			.doc(this.props.gym_id)
			.get()
			.then((item) => {
				if (item.data().gymOwner === Cookies.get('user')) {
					this.setState({
						allFieldsValidated: true,
						youAdmin: true,
						name: { value: "Zarezerwowane" },
						surname: {value: "przez ciebie"},
						phoneNumber:{value: "733111222"},
						email:{value: "twojMail@gmail.com"},
						ownerMail: item.data().gymOwnerEmail || "",
						gymName: item.data().gymName,
					});
				} else {
					this.setState({
						ownerMail: item.data().gymOwnerEmail || "",
						gymName: item.data().gymName,
					});
				}
			})
			.catch(function (error) {
				console.error("Error ", error);
			});
	}

	getDaysBetweenDates(start, end, dayName) {
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

	//***********/

	onChangeTime = (time, times) => {
		console.log(times[0]);
		this.setState({ times: times });
		// this.setState({ dateStrings });
	};

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
		this.setState({ view: view.viewType });
		console.log(this.state.view);
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

	reserveNonZero = (
		schedulerData,
		slotId,
		slotName,
		start,
		end,
		type,
		item
	) => {
		let newFreshId = 0;
		schedulerData.events.forEach((item) => {
			if (item.id >= newFreshId) newFreshId = item.id + 1;
		});

		let startTime = this.state.times[0].substring(0, 5); // picker zwraca godzinę startową i godzinę końcową jako array stąd
		let endTime = this.state.times[1].substring(0, 5); // rozróżnienie na [0] i [1]

		let newEvent = {
			id: newFreshId,
			title: "Do akceptacji",
			start: start.substring(0, 10) + " " + startTime, //zmienione dodawanie start i end do firebase
			end: end.substring(0, 10) + " " + endTime, //data z kalendarza, godzina z pickera pod kalendarzem
			resourceId: slotId,
			bgColor: "#FFD700",
		};

		schedulerData.addEvent(newEvent);
		this.setState({ viewModel: schedulerData });

		if (this.state.youAdmin) {
			db.collection("reservation")
			.add({
				id: newEvent.id,
				title: "Zarezerwowane",
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
				window.location.replace("/finishReservation");
			});
		} else {
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
			// .then(() => {
			// 	axios({
			// 		method: "POST",
			// 		url: "/sendNotifs",
			// 	});
			// })
			.then(() => {
				window.location.reload();
				window.location.replace("/finishReservation");
			});
		}
	};

	reserveZero = (schedulerData, slotId, slotName, start, end, type, item) => {
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
		this.setState({ viewModel: schedulerData });


		if (this.state.youAdmin) {
			db.collection("reservation")
			.add({
				id: newEvent.id,
				title: "Zarezerwowane",
				start: newEvent.start.substring(0, 16),
				end: newEvent.end.substring(0, 16),
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
				window.location.replace("/finishReservation");
			});
		} else {
			const temp = this.props.youAdmin?"Zarezerwowane":"Do akceptacji";
			db.collection("reservation")
			.add({
				id: newEvent.id,
				title: temp,
				start: newEvent.start.substring(0, 16),
				end: newEvent.end.substring(0, 16),
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
				// axios({
				// 	method: "POST",
				// 	url: "/sendNotifs",
				// 	data: {
				// 		name: this.state.name.value,
				// 		surname: this.state.surname.value,
				// 		gymName: this.state.gymName,
				// 		email: this.state.ownerMail,
				// 	},
				// });
			})
			.then(() => {
				window.location.reload();
				window.location.replace("/finishReservation");
			});
		}	
	};

	newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
		let today = new Date();
		let startDate = new Date(start);
		const { email, name, surname, phoneNumber } = this.state;
		const emailError = validateFields.validateEmail(email.value);
		const nameError = validateFields.validateName(name.value);
		const surnameError = validateFields.validateSurname(surname.value);
		const phoneNumberError = validateFields.validatePhoneNumber(
			phoneNumber.value
		);

		console.log(emailError)

		if (startDate < today) {
			confirmAlert({
				title: "Początkowa data nie może być z przeszłości!",
				buttons: [
					{
						label: "OK",
					},
				],
			});
		} else if (this.state.youAdmin || (emailError === false && nameError === false && surnameError === false && phoneNumberError === false)) {
			if (this.state.view !== 0) {
				//jeśli kalendarz jest ustawiony na coś co nie jest dniem
				console.log("this.state.times.length", this.state.times.length);
				if (this.state.times.length == 2) {
					// jeśli array times nie jest pusty (użytkownik wybrał godzinę pod kalendarzem) to wyświetl alert i kontynuuj
					confirmAlert({
						title: "Chcesz zarezerwować termin?",
						message: `Od ${
							start.substring(0, 10) +
							" " +
							this.state.times[0].substring(0, 5)
						} 
										do ${end.substring(0, 10) + " " + this.state.times[1].substring(0, 5)}`,
						buttons: [
							{
								label: "ZAREZERWUJ",
								onClick: () =>
									this.reserveNonZero(
										schedulerData,
										slotId,
										slotName,
										start,
										end,
										type,
										item
									),
							},
							{
								label: "WRÓĆ",
							},
						],
					});
				} else {
					confirmAlert({
						title: "Trzeba wybrać czas!",
						buttons: [
							{
								label: "OK",
							},
						],
					});
				}
			} else {
				//jeśli kalendarz jest ustawiony na dzień / użytkownik wybrał rezerwacje długoterminową
				confirmAlert({
					title: "Chcesz zarezerwować termin?",
					message: `Od ${start} do ${end}`,
					buttons: [
						{
							label: "ZAREZERWUJ",
							onClick: () =>
								this.reserveZero(
									schedulerData,
									slotId,
									slotName,
									start,
									end,
									type,
									item
								),
						},
						{
							label: "WRÓĆ",
						},
					],
				});
			}
		} else {
			confirmAlert({
				title: "Wprowadź poprawne dane!",
				buttons: [
					{
						label: "OK",
					},
				],
			});
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

	handleBlur(validationFunc, evt) {
		const field = evt.target.name;
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

	handleChange(validationFunc, evt) {
		const field = evt.target.name;
		const fieldVal = evt.target.value;
		this.setState((state) => ({
			[field]: {
				...state[field],
				value: fieldVal,
				error: state[field]["validateOnChange"]
					? validationFunc(fieldVal)
					: "",
			},
		}));
	}

	handleSubmit(evt) {
		evt.preventDefault();
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

	handleNotif() {
		return new Promise(() => {
			axios({
				method: "POST",
				url: "/send",
				data: {
					name: "test",
					surname: "test",
					gymName: "test",
					email: "bemygym@gmail.com",
				},
			}).then((response) => {
				if (response.data.status === "success") {
					alert("Wiadomość została wysłana");
				} else if (response.data.status === "fail") {
					alert("Błąd");
				}
			});
		});
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
						autocomplete="on"
					>
						<h3
							style={{
								textAlign: "center",
								color: "var(--darkOrange)",
								marginLeft: "-6%",
							}}
						>
							{this.state.youAdmin
								? "Zarezerwuj niedostępny czas dla swojej sali"
								: "Rezerwacja"}
						</h3>
						{/* Name field */}
						<div
							style={
								this.state.youAdmin ? { display: "none" } : null
							}
							className="form-group-left"
						>
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
										this.handleChange(
											validateFields.validateName,
											evt
										)
									}
									onBlur={(evt) =>
										this.handleBlur(
											validateFields.validateName,
											evt
										)
									}
									required
								/>
								<div className="invalid-feedback">
									{name.error}
								</div>
							</div>
							{/* Surname field */}
							<div className="form-group">
								<label className="form-group-label">
									nazwisko
								</label>
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
										this.handleChange(
											validateFields.validateSurname,
											evt
										)
									}
									onBlur={(evt) =>
										this.handleBlur(
											validateFields.validateSurname,
											evt
										)
									}
									required
								/>
								<div className="invalid-feedback">
									{surname.error}
								</div>
							</div>
							{/* Email field */}
							<div className="form-group">
								<label className="form-group-label">
									Email
								</label>
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
										this.handleChange(
											validateFields.validateEmail,
											evt
										)
									}
									onBlur={(evt) =>
										this.handleBlur(
											validateFields.validateEmail,
											evt
										)
									}
									required
								/>
								<div className="invalid-feedback">
									{email.error}
								</div>
							</div>
							{/* phoneNumber field */}
							<div className="form-group">
								<label className="form-group-label">
									Telefon
								</label>
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
										{
											"is-valid":
												phoneNumber.error === false,
										},
										{ "is-invalid": phoneNumber.error }
									)}
									onChange={(evt) =>
										this.handleChange(
											validateFields.validatePhoneNumber,
											evt
										)
									}
									onBlur={(evt) =>
										this.handleBlur(
											validateFields.validatePhoneNumber,
											evt
										)
									}
									required
								/>
								<div className="invalid-feedback">
									{phoneNumber.error}
								</div>
							</div>
							<br />
							<button
								type="submit"
								className="booking-button"
								onMouseDown={() =>
									this.setState({ submitCalled: true })
								}
								value="Wybierz termin"
							>
								Wybierz przedział czasowy
							</button>
						</div>
						<p style={{ height: 10 }} />
						{allFieldsValidated && (
							<div>
							<Tabs style={{ width: "60vw" }}>
								<TabList>
									<Tab>Rezerwacja krótkoterminowa</Tab>
									<Tab>Rezerwacja długoterminowa</Tab>
								</TabList>

								<TabPanel>
									<p style={{ height: 10 }} />
									{!(this.state.view == 0) ? (
										<div>
											<p
												style={{
													color: "var(--darkOrange)",
												}}
											>
												Najpierw wybierz czas *:
											</p>
											<RangePicker
												format="HH:mm"
												minuteStep={30}
												disabledHours={() => [
													0,
													1,
													2,
													3,
													4,
													5,
													23,
												]}
												hideDisabledOptions="true"
												onChange={this.onChangeTime}
											/>
										</div>
									) : (
										""
									)}

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
											updateEventStart={
												this.updateEventStart
											}
											updateEventEnd={this.updateEventEnd}
											moveEvent={this.moveEvent}
											newEvent={this.newEvent}
											onScrollLeft={this.onScrollLeft}
											onScrollRight={this.onScrollRight}
											onScrollTop={this.onScrollTop}
											onScrollBottom={this.onScrollBottom}
											toggleExpandFunc={
												this.toggleExpandFunc
											}
											recurringEventsEnabled
										/>
									</ConfigProvider>
								</TabPanel>
								<TabPanel>
									<p style={{ height: 10 }} />
									<div className="range-picker-left">
										<RangePickerForGym
											name={this.state.name.value}
											surname={this.state.surname.value}
											email={this.state.email.value}
											phoneNumber={
												this.state.phoneNumber.value
											}
											user={this.state.user}
											gym_id={this.props.gym_id}
											ownerMail={this.state.ownerMail}
											gymName={this.state.gymName}
											owner={this.state.youAdmin}
										/>
									</div>
								</TabPanel>
							</Tabs>
							<p style={{ height: 10 }} />
								<div className="range-picker-left mobile_pick">
									<RangePickerForGym
										name={this.state.name.value}
										surname={this.state.surname.value}
										email={this.state.email.value}
										phoneNumber={
											this.state.phoneNumber.value
										}
										user={this.state.user}
										gym_id={this.props.gym_id}
										ownerMail={this.state.ownerMail}
										gymName={this.state.gymName}
									/>
								</div>
								</div>
							
						)}
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
