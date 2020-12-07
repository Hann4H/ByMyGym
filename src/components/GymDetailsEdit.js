import React, { Component } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider } from "@material-ui/styles";
import DateFnsUtils from "@date-io/date-fns";
import { createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { validateFields } from "../Validation";
import classnames from "classnames";
import firebase from "../firebase";
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

class GymDetailsEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gymName: { value: "", validateOnChange: false, error: "" },
			gymStreet: { value: "", validateOnChange: false, error: "" },
			gymCity: { value: "", validateOnChange: false, error: "" },
			gymZip: { value: "", validateOnChange: false, error: "" },
			gymHeight: { value: "", validateOnChange: false, error: "" },
			gymWidth: { value: "", validateOnChange: false, error: "" },
			gymLength: { value: "", validateOnChange: false, error: "" },

			gymPrice: { value: "", validateOnChange: false, error: "" },
			audience: { value: "", validateOnChange: false, error: "" },
			changingRooms: { value: "", validateOnChange: false, error: "" },
			gymURL: { value: "", validateOnChange: false, error: "" },
			gymPhone: { value: "", validateOnChange: false, error: "" },
			gymEmail: { value: "", validateOnChange: false, error: "" },
			gymDescription: { value: "", validateOnChange: false, error: "" },

			// gymPrice
			// audience
			// changingRooms
			// gymURL
			// gymPhone
			// gymEmail
			// gymDescription

			// gymLat
			// gymLng
			// gymURL
			// gymPhone
			// gymEmail
			// gymDescription
			//nr mieszkania?
			//liczba miejsc na widowni ?
			// liczba szatn ?
			//cena ?
			// zdjecia ?

			submitCalled: false,
			allFieldsValidated: false,
			data: [],
		};

		this.handleBlur = this.handleBlur.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async componentDidMount(props) {
		try {
			const gymsRef = db.collection("gyms").doc(this.props.dataId);
			const doc = await gymsRef.get();
			if (!doc.exists) {
				console.log("No such document!");
			} else {
				console.log("Document data:", doc.data());
				this.setState({
					data: doc.data(),
					gymName: { value: doc.data().gymName },
					gymStreet: { value: doc.data().gymStreet },
					gymCity: { value: doc.data().gymCity },
					gymZip: { value: doc.data().gymZip },
					gymHeight: { value: doc.data().gymHeight },
					gymWidth: { value: doc.data().gymWidth },
					gymLength: { value: doc.data().gymLength },

					gymPrice: { value: doc.data().gymPrice },
					audience: { value: doc.data().audience },
					changingRooms: { value: doc.data().changingRooms },
					gymURL: { value: doc.data().gymURL },
					gymPhone: { value: doc.data().gymPhone },
					gymEmail: { value: doc.data().gymEmail },
					gymDescription: { value: doc.data().gymDescription },
				});
			}
		} catch (error) {
			console.log("Wystapił błąd");
			console.log(error);
		}
	}

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
				error: state[field]["validateOnChange"]
					? validationFunc(fieldVal)
					: "",
			},
		}));
	}

	handleSubmit(evt) {
		evt.preventDefault();
		// validate all fields
		const {
			gymName,
			gymStreet,
			gymCity,
			gymZip,
			gymHeight,
			gymWidth,
			gymLength,
			gymPrice,
			audience,
			changingRooms,
			gymURL,
			gymPhone,
			gymEmail,
			gymDescription,
		} = this.state;
		const gymNameError = validateFields.validateGymName(gymName.value);
		const gymStreetError = validateFields.validateGymStreet(
			gymStreet.value
		);
		const gymCityError = validateFields.validateGymCity(gymCity.value);
		const gymZipError = validateFields.validateGymZip(gymZip.value);
		const gymHeightError = validateFields.validateGymHeight(
			gymHeight.value
		);
		const gymWidthError = validateFields.validateGymWidth(gymWidth.value);
		const gymLengthError = validateFields.validateGymLength(
			gymLength.value
		);

		const gymPriceError = validateFields.validateGymPrice(gymPrice.value);
		const audienceError = validateFields.validateAudience(audience.value);
		const changingRoomsError = validateFields.validateChangingRooms(
			changingRooms.value
		);
		const gymURLError = validateFields.validateGymURL(gymURL.value);
		const gymPhoneError = validateFields.validateGymPhone(gymPhone.value);
		const gymEmailError = validateFields.validateGymEmail(gymEmail.value);
		const gymDescriptionError = validateFields.validateGymDescription(
			gymDescription.value
		);

		if (
			[
				gymNameError,
				gymStreetError,
				gymCityError,
				gymZipError,
				gymHeightError,
				gymWidthError,
				gymLengthError,
				gymPriceError,
				audienceError,
				changingRoomsError,
				gymURLError,
				gymPhoneError,
				gymEmailError,
				gymDescriptionError,
			].every((e) => e === false)
		) {
			// no errors submit the form
			this.setState({ allFieldsValidated: true });

			db.collection("gyms")
				.doc(this.props.dataId)
				.update({
					gymName: this.state.gymName.value,
					gymStreet: this.state.gymStreet.value,
					gymCity: this.state.gymCity.value,
					gymZip: this.state.gymZip.value,
					gymHeight: this.state.gymHeight.value,
					gymWidth: this.state.gymWidth.value,
					gymLength: this.state.gymLength.value,

					gymPrice: this.state.gymPrice.value,
					audience: this.state.audience.value,
					changingRooms: this.state.changingRooms.value,
					gymURL: this.state.gymURL.value,
					gymPhone: this.state.gymPhone.value,
					gymEmail: this.state.gymEmail.value,
					gymDescription: this.state.gymDescription.value,
				})
				.then(function () {
					console.log("Changes saved!");
				})
				.catch(function (error) {
					console.error("Error saving changes: ", error);
				});
		} else {
			// update the state with errors
			this.setState((state) => ({
				gymName: {
					...state.gymName,
					validateOnChange: true,
					error: gymNameError,
				},
				gymStreet: {
					...state.gymStreet,
					validateOnChange: true,
					error: gymStreetError,
				},
				gymCity: {
					...state.gymCity,
					validateOnChange: true,
					error: gymCityError,
				},
				gymZip: {
					...state.gymZip,
					validateOnChange: true,
					error: gymZipError,
				},
				gymHeight: {
					...state.gymHeight,
					validateOnChange: true,
					error: gymHeightError,
				},
				gymWidth: {
					...state.gymWidth,
					validateOnChange: true,
					error: gymWidthError,
				},
				gymLength: {
					...state.gymLength,
					validateOnChange: true,
					error: gymLengthError,
				},

				gymPrice: {
					...state.gymPrice,
					validateOnChange: true,
					error: gymPriceError,
				},
				audience: {
					...state.audience,
					validateOnChange: true,
					error: audienceError,
				},
				changingRooms: {
					...state.changingRooms,
					validateOnChange: true,
					error: changingRoomsError,
				},
				gymURL: {
					...state.gymURL,
					validateOnChange: true,
					error: gymURLError,
				},
				gymPhone: {
					...state.gymPhone,
					validateOnChange: true,
					error: gymPhoneError,
				},
				gymEmail: {
					...state.gymEmail,
					validateOnChange: true,
					error: gymEmailError,
				},
				gymDescription: {
					...state.gymDescription,
					validateOnChange: true,
					error: gymDescriptionError,
				},
			}));
		}
	}

	render() {
		const {
			gymName,
			gymStreet,
			gymCity,
			gymZip,
			gymHeight,
			gymWidth,
			gymLength,

			gymPrice,
			audience,
			changingRooms,
			gymURL,
			gymPhone,
			gymEmail,
			gymDescription,

			// email,
			// name,
			// surname,
			// phoneNumber,
			allFieldsValidated,
		} = this.state;

		return (
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
								<form
									onSubmit={(evt) => this.handleSubmit(evt)}
									className="gymForm"
								>
									<h3
										style={{
											textAlign: "center",
											color: "var(--darkOrange)",
										}}
									>
										Wprowadź poniżej zmiany
									</h3>

									{/* gymName field */}
									<div className="form-group">
										<TextField
											label="Nazwa budynku"
											type="text"
											name="gymName"
											value={gymName.value}
											InputLabelProps={{
												shrink: true,
											}}
											inputProps={{
												size: 30,
											}}
											floatingLabelFixed={true}
											className={classnames(
												"form-control",
												{
													"is-valid":
														gymName.error === false,
												},
												{ "is-invalid": gymName.error }
											)}
											onChange={(evt) =>
												this.handleChange(
													validateFields.validateGymName,
													evt
												)
											}
											onBlur={(evt) =>
												this.handleBlur(
													validateFields.validateGymName,
													evt
												)
											}
											required
										/>
										<div className="invalid-feedback">
											{gymName.error}
										</div>
									</div>
									{/* gymStreet field */}
									<div className="form-group">
										<TextField
											label="Ulica"
											type="text"
											name="gymStreet"
											value={gymStreet.value}
											InputLabelProps={{
												shrink: true,
											}}
											inputProps={{
												size: 30,
											}}
											floatingLabelFixed={true}
											className={classnames(
												"form-control",
												{
													"is-valid":
														gymStreet.error ===
														false,
												},
												{
													"is-invalid":
														gymStreet.error,
												}
											)}
											onChange={(evt) =>
												this.handleChange(
													validateFields.validateGymStreet,
													evt
												)
											}
											onBlur={(evt) =>
												this.handleBlur(
													validateFields.validateGymStreet,
													evt
												)
											}
											required
										/>
										<div className="invalid-feedback">
											{gymStreet.error}
										</div>
									</div>
									{/* gymCity field */}
									<div className="form-group">
										<TextField
											label="Miasto"
											type="text"
											name="gymCity"
											value={gymCity.value}
											InputLabelProps={{
												shrink: true,
											}}
											inputProps={{
												size: 30,
											}}
											floatingLabelFixed={true}
											className={classnames(
												"form-control",
												{
													"is-valid":
														gymCity.error === false,
												},
												{ "is-invalid": gymCity.error }
											)}
											onChange={(evt) =>
												this.handleChange(
													validateFields.validateGymCity,
													evt
												)
											}
											onBlur={(evt) =>
												this.handleBlur(
													validateFields.validateGymCity,
													evt
												)
											}
											required
										/>
										<div className="invalid-feedback">
											{gymCity.error}
										</div>
									</div>
									{/* gymZip field */}
									<div className="form-group">
										<TextField
											label="Kod pocztowy"
											type="text"
											name="gymZip"
											value={gymZip.value}
											InputLabelProps={{
												shrink: true,
											}}
											inputProps={{
												size: 30,
											}}
											floatingLabelFixed={true}
											className={classnames(
												"form-control",
												{
													"is-valid":
														gymZip.error === false,
												},
												{ "is-invalid": gymZip.error }
											)}
											onChange={(evt) =>
												this.handleChange(
													validateFields.validateGymZip,
													evt
												)
											}
											onBlur={(evt) =>
												this.handleBlur(
													validateFields.validateGymZip,
													evt
												)
											}
											required
										/>
										<div className="invalid-feedback">
											{gymZip.error}
										</div>
									</div>
									{/* gymHeight field */}
									<div className="form-group">
										<TextField
											label="Wysokość"
											type="text"
											name="gymHeight"
											value={gymHeight.value}
											InputLabelProps={{
												shrink: true,
											}}
											inputProps={{
												size: 30,
											}}
											floatingLabelFixed={true}
											className={classnames(
												"form-control",
												{
													"is-valid":
														gymHeight.error ===
														false,
												},
												{
													"is-invalid":
														gymHeight.error,
												}
											)}
											onChange={(evt) =>
												this.handleChange(
													validateFields.validateGymHeight,
													evt
												)
											}
											onBlur={(evt) =>
												this.handleBlur(
													validateFields.validateGymHeight,
													evt
												)
											}
											required
										/>
										<div className="invalid-feedback">
											{gymHeight.error}
										</div>
									</div>
									{/* gymWidth field */}
									<div className="form-group">
										<TextField
											label="Szerokość"
											type="text"
											name="gymWidth"
											value={gymWidth.value}
											InputLabelProps={{
												shrink: true,
											}}
											inputProps={{
												size: 30,
											}}
											floatingLabelFixed={true}
											className={classnames(
												"form-control",
												{
													"is-valid":
														gymWidth.error ===
														false,
												},
												{ "is-invalid": gymWidth.error }
											)}
											onChange={(evt) =>
												this.handleChange(
													validateFields.validateGymWidth,
													evt
												)
											}
											onBlur={(evt) =>
												this.handleBlur(
													validateFields.validateGymWidth,
													evt
												)
											}
											required
										/>
										<div className="invalid-feedback">
											{gymWidth.error}
										</div>
									</div>
									{/* gymLength field */}
									<div className="form-group">
										<TextField
											label="Długość"
											type="text"
											name="gymLength"
											value={gymLength.value}
											InputLabelProps={{
												shrink: true,
											}}
											inputProps={{
												size: 30,
											}}
											floatingLabelFixed={true}
											className={classnames(
												"form-control",
												{
													"is-valid":
														gymLength.error ===
														false,
												},
												{
													"is-invalid":
														gymLength.error,
												}
											)}
											onChange={(evt) =>
												this.handleChange(
													validateFields.validateGymLength,
													evt
												)
											}
											onBlur={(evt) =>
												this.handleBlur(
													validateFields.validateGymLength,
													evt
												)
											}
											required
										/>
										<div className="invalid-feedback">
											{gymLength.error}
										</div>
									</div>

									{/* gymPrice field */}
									<div className="form-group">
										<TextField
											label="Cena"
											type="text"
											name="gymPrice"
											value={gymPrice.value}
											InputLabelProps={{
												shrink: true,
											}}
											inputProps={{
												size: 30,
											}}
											floatingLabelFixed={true}
											className={classnames(
												"form-control",
												{
													"is-valid":
														gymPrice.error ===
														false,
												},
												{ "is-invalid": gymPrice.error }
											)}
											onChange={(evt) =>
												this.handleChange(
													validateFields.validateGymPrice,
													evt
												)
											}
											onBlur={(evt) =>
												this.handleBlur(
													validateFields.validateGymPrice,
													evt
												)
											}
											required
										/>
										<div className="invalid-feedback">
											{gymPrice.error}
										</div>
									</div>
									{/* audience field */}
									<div className="form-group">
										<TextField
											label="Liczba miejsc na widowni"
											type="text"
											name="audience"
											value={audience.value}
											InputLabelProps={{
												shrink: true,
											}}
											inputProps={{
												size: 30,
											}}
											floatingLabelFixed={true}
											className={classnames(
												"form-control",
												{
													"is-valid":
														audience.error ===
														false,
												},
												{ "is-invalid": audience.error }
											)}
											onChange={(evt) =>
												this.handleChange(
													validateFields.validateAudience,
													evt
												)
											}
											onBlur={(evt) =>
												this.handleBlur(
													validateFields.validateAudience,
													evt
												)
											}
											required
										/>
										<div className="invalid-feedback">
											{audience.error}
										</div>
									</div>
									{/* changingRooms field */}
									<div className="form-group">
										<TextField
											label="Liczna szatń"
											type="text"
											name="changingRooms"
											value={changingRooms.value}
											InputLabelProps={{
												shrink: true,
											}}
											inputProps={{
												size: 30,
											}}
											floatingLabelFixed={true}
											className={classnames(
												"form-control",
												{
													"is-valid":
														changingRooms.error ===
														false,
												},
												{
													"is-invalid":
														changingRooms.error,
												}
											)}
											onChange={(evt) =>
												this.handleChange(
													validateFields.validateChangingRooms,
													evt
												)
											}
											onBlur={(evt) =>
												this.handleBlur(
													validateFields.validateChangingRooms,
													evt
												)
											}
											required
										/>
										<div className="invalid-feedback">
											{changingRooms.error}
										</div>
									</div>
									{/* gymURL field */}
									<div className="form-group">
										<TextField
											label="URL"
											type="text"
											name="gymURL"
											value={gymURL.value}
											InputLabelProps={{
												shrink: true,
											}}
											inputProps={{
												size: 30,
											}}
											floatingLabelFixed={true}
											className={classnames(
												"form-control",
												{
													"is-valid":
														gymURL.error === false,
												},
												{ "is-invalid": gymURL.error }
											)}
											onChange={(evt) =>
												this.handleChange(
													validateFields.validateGymURL,
													evt
												)
											}
											onBlur={(evt) =>
												this.handleBlur(
													validateFields.validateGymURL,
													evt
												)
											}
											required
										/>
										<div className="invalid-feedback">
											{gymURL.error}
										</div>
									</div>
									{/* gymPhone field */}
									<div className="form-group">
										<TextField
											label="Telefon"
											type="text"
											name="gymPhone"
											value={gymPhone.value}
											InputLabelProps={{
												shrink: true,
											}}
											inputProps={{
												size: 30,
											}}
											floatingLabelFixed={true}
											className={classnames(
												"form-control",
												{
													"is-valid":
														gymPhone.error ===
														false,
												},
												{ "is-invalid": gymPhone.error }
											)}
											onChange={(evt) =>
												this.handleChange(
													validateFields.validateGymPhone,
													evt
												)
											}
											onBlur={(evt) =>
												this.handleBlur(
													validateFields.validateGymPhone,
													evt
												)
											}
											required
										/>
										<div className="invalid-feedback">
											{gymPhone.error}
										</div>
									</div>
									{/* gymEmail field */}
									<div className="form-group">
										<TextField
											label="Email"
											type="text"
											name="gymEmail"
											value={gymEmail.value}
											InputLabelProps={{
												shrink: true,
											}}
											inputProps={{
												size: 30,
											}}
											floatingLabelFixed={true}
											className={classnames(
												"form-control",
												{
													"is-valid":
														gymEmail.error ===
														false,
												},
												{ "is-invalid": gymEmail.error }
											)}
											onChange={(evt) =>
												this.handleChange(
													validateFields.validateGymEmail,
													evt
												)
											}
											onBlur={(evt) =>
												this.handleBlur(
													validateFields.validateGymEmail,
													evt
												)
											}
											required
										/>
										<div className="invalid-feedback">
											{gymEmail.error}
										</div>
									</div>
									{/* gymDescription field */}
									<div className="form-group">
										<TextField
											label="Opis"
											type="text"
											name="gymDescription"
											value={gymDescription.value}
											InputLabelProps={{
												shrink: true,
											}}
											inputProps={{
												size: 30,
											}}
											floatingLabelFixed={true}
											className={classnames(
												"form-control",
												{
													"is-valid":
														gymDescription.error ===
														false,
												},
												{
													"is-invalid":
														gymDescription.error,
												}
											)}
											onChange={(evt) =>
												this.handleChange(
													validateFields.validateGymDescription,
													evt
												)
											}
											onBlur={(evt) =>
												this.handleBlur(
													validateFields.validateGymDescription,
													evt
												)
											}
											required
										/>
										<div className="invalid-feedback">
											{gymDescription.error}
										</div>
									</div>

									<br />
									<button
										type="submit"
										className="booking-button"
										onMouseDown={() =>
											this.setState({
												submitCalled: true,
											})
										}
										value="Zapisz"
									>
										Zapisz
									</button>
									{/* <br />
                      {allFieldsValidated && (<p>all fields validated</p>)}
                      <br /> */}
								</form>
							</ThemeProvider>
						</Grid>
					</div>
				</MuiPickersUtilsProvider>
			</div>
		);
	}
}

export default GymDetailsEdit;
