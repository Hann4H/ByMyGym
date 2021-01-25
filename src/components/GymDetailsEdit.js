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
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Cookies from "js-cookie"

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
			gymOwner: { value: "", validateOnChange: false, error: "" },

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
					gymURL: { value: doc.data().gymURL } || { value: "" },
					gymPhone: { value: doc.data().gymPhone },
					gymEmail: { value: doc.data().gymEmail },
					gymDescription: { value: doc.data().gymDescription } || {
						value: "",
					},

					gymOwner: { value: doc.data().gymOwner },
				});
			}
		} catch (error) {
			console.log("Wystapił błąd");
			console.log(error);
		}
	}

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
			gymOwner,
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

		const gymOwnerError = validateFields.validateGymOwner(gymOwner.value);

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
				gymOwnerError,
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
					gymHeight: Number(this.state.gymHeight.value),
					gymWidth: Number(this.state.gymWidth.value),
					gymLength: Number(this.state.gymLength.value),

					gymPrice: Number(this.state.gymPrice.value),
					audience: Number(this.state.audience.value),
					changingRooms: Number(this.state.changingRooms.value),
					gymURL: this.state.gymURL.value || "",
					gymPhone: this.state.gymPhone.value,
					gymEmail: this.state.gymEmail.value,
					gymDescription: this.state.gymDescription.value || "",

					gymOwner: this.state.gymOwner.value,
				})
				.then(function () {
					confirmAlert({
						title: "Zmiany zostały zapisane.",
						buttons: [
							{
								label: "OK",
							},
						],
					});
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
				gymOwner: {
					...state.gymOwner,
					validateOnChange: true,
					error: gymOwnerError,
				},
			}));
		}
		window.scrollTo(0, 500);
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

			gymOwner,

			// email,
			// name,
			// surname,
			// phoneNumber,
			allFieldsValidated,
		} = this.state;

		return (
			<div>
				<div className="booking-container">
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
							<label className="form-group-label">
								Nazwa budynku
							</label>
							<input
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
										"is-valid": gymName.error === false,
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
							<label className="form-group-label">Ulica</label>
							<input
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
										"is-valid": gymStreet.error === false,
									},
									{
										"is-invalid": gymStreet.error,
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
							<label className="form-group-label">Miasto</label>
							<input
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
										"is-valid": gymCity.error === false,
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
							<label className="form-group-label">
								Kod pocztowy
							</label>
							<input
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
										"is-valid": gymZip.error === false,
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
							<label className="form-group-label">Wysokość</label>
							<input
								label="Wysokość"
								type="number"
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
										"is-valid": gymHeight.error === false,
									},
									{
										"is-invalid": gymHeight.error,
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
							<label className="form-group-label">
								Szerokość
							</label>
							<input
								label="Szerokość"
								type="number"
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
										"is-valid": gymWidth.error === false,
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
							<label className="form-group-label">Długość</label>
							<input
								label="Długość"
								type="number"
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
										"is-valid": gymLength.error === false,
									},
									{
										"is-invalid": gymLength.error,
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
							<label className="form-group-label">Cena</label>
							<input
								label="Cena"
								type="number"
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
										"is-valid": gymPrice.error === false,
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
							<label className="form-group-label">
								Liczba miejsc na widowni
							</label>
							<input
								label="Liczba miejsc na widowni"
								type="number"
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
										"is-valid": audience.error === false,
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
							<label className="form-group-label">
								Liczna szatń
							</label>
							<input
								label="Liczna szatń"
								type="number"
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
											changingRooms.error === false,
									},
									{
										"is-invalid": changingRooms.error,
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
							<label className="form-group-label">URL</label>
							<input
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
										"is-valid": gymURL.error === false,
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
							/>
							<div className="invalid-feedback">
								{gymURL.error}
							</div>
						</div>
						{/* gymPhone field */}
						<div className="form-group">
							<label className="form-group-label">Telefon</label>
							<input
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
										"is-valid": gymPhone.error === false,
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
							<label className="form-group-label">Email</label>
							<input
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
										"is-valid": gymEmail.error === false,
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
							<label className="form-group-label">Opis</label>
							<textarea
								label="Opis"
								type="text"
								name="gymDescription"
								value={gymDescription.value || ""}
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
											gymDescription.error === false,
									},
									{
										"is-invalid": gymDescription.error,
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
								// required
							/>
							<div className="invalid-feedback">
								{gymDescription.error}
							</div>
						</div>
						{/* gymOwner field */}

						{Cookies.get('user') ==
						process.env.REACT_APP_ADMIN_ID ? (
							<div className="form-group">
								<label className="form-group-label">
									Właściciel
								</label>
								<input
									label="Właściciel"
									type="text"
									name="gymOwner"
									value={
										gymOwner.value
											? gymOwner.value
											: (gymOwner.value = "")
									}
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
												gymOwner.error === false,
										},
										{
											"is-invalid": gymOwner.error,
										}
									)}
									onChange={(evt) =>
										this.handleChange(
											validateFields.validateGymOwner,
											evt
										)
									}
									onBlur={(evt) =>
										this.handleBlur(
											validateFields.validateGymOwner,
											evt
										)
									}
								/>
								<div className="invalid-feedback">
									{gymOwner.error}
								</div>
							</div>
						) : (
							""
						)}

						<br />
						<div style={{ textAlign: "center" }}>
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
						</div>
						{/* <br />
                      {allFieldsValidated && (<p>all fields validated</p>)}
                      <br /> */}
					</form>
				</div>
			</div>
		);
	}
}

export default GymDetailsEdit;
