import React, { useState } from "react";
import firebase from "../firebase";
import "firebase/storage";
import DragAndDrop from "./DragAndDrop";
import Modal from "react-modal";
import InputMask from "react-input-mask";
import validate from "./FormValidationRules";
import validated from "./Validated";

Modal.setAppElement("#root");

export default function gymForm() {
	const [values, setValues] = useState({});
	const [errors, setErrors] = useState({});
	const [imageAsFile, setImageAsFile] = useState("");
	const [userUID, setUserUID] = useState("");
	console.log(imageAsFile);

	const handleImageAsFile = (e) => {
		const image = e.target.files[0];
		setImageAsFile((imageFile) => image);
	};

	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			setUserUID(user.uid);
		} else {
			console.log("nie pykło");
		}
	});

	var storage = firebase.storage();
	const db = firebase.firestore();
	const ref = db.collection("gyms").doc();

	const handleSubmit = (event) => {
		setErrors({});
		event.preventDefault();
		setErrors(validate(values));
		console.log(validated(values));

		if (validated(values)) {
			const uploadTask = storage
				.ref(`/photos/${imageAsFile.name}`)
				.put(imageAsFile);
			uploadTask
				.then((uploadTaskSnapshot) => {
					return uploadTaskSnapshot.ref.getDownloadURL();
				})
				.then((gymPhoto) => {
					db.collection("gyms")
						.add({
							gymName: values.gymName,
							gymStreet: values.gymStreet,
							gymCity: values.gymCity,
							gymZip: values.gymZip,
							gymPhoto: [gymPhoto],
							gymHeight: values.gymHeight,
							gymWidth: values.gymWidth,
							gymLength: values.gymLength,
							gymPrice: values.gymPrice,
							audience: values.audience,
							changingRooms: values.changingRooms,
							id: ref.id,
							gymOwner: userUID,

							gymURL: values.gymURL,
							gymPhone: values.gymPhone,
							gymEmail: values.gymEmail,
							gymDescription: values.gymDescription,
							// gymLat: values.gymLat,
							// gymLng: values.gymLng
						})
						.then(() => {
							alert("Sala została dodana");
							window.location.href = "/";
						});
				});
		}
	};

	const handleChange = (event) => {
		event.persist();
		setValues((values) => ({
			...values,
			[event.target.name]: event.target.value,
		}));
	};

	return (
		<form onSubmit={handleSubmit} className="gymForm" noValidate>
			<div className="form-n-gallery">
				<div className="form-only">
					<div className="container-2">
						<label>Nazwa budynku</label>
						<div className="input-n-error">
							<input
								autoComplete="off"
								type="text"
								name="gymName"
								onChange={handleChange}
								value={values.gymName || ""}
								required
							/>
							{errors.gymName && (
								<p className="help">{errors.gymName}</p>
							)}
						</div>
					</div>
					<div className="container-2">
						<label>Ulica</label>
						<div className="input-n-error">
							<input
								autoComplete="off"
								type="text"
								name="gymStreet"
								onChange={handleChange}
								value={values.gymStreet || ""}
								required
							/>
							{errors.gymStreet && (
								<p className="help">{errors.gymStreet}</p>
							)}
						</div>
					</div>
					<div className="container-2">
						<label>Miasto</label>
						<div className="input-n-error">
							<InputMask
								autoComplete="off"
								type="text"
								value={values.gymCity || ""}
								name="gymCity"
								onChange={handleChange}
								required
							/>
							{errors.gymCity && (
								<p className="help">{errors.gymCity}</p>
							)}
						</div>
					</div>
					<div className="container-2">
						<label>Kod pocztowy</label>
						<div className="input-n-error">
							<InputMask
								autoComplete="off"
								type="text"
								value={values.gymZip || ""}
								name="gymZip"
								pattern="^\d{2}-\d{3}$"
								mask="99-999"
								onChange={handleChange}
								required
							/>
							{errors.gymZip && (
								<p className="help">{errors.gymZip}</p>
							)}
						</div>
					</div>
					<div className="container-2">
						<label>Długość</label>
						<div className="input-n-error">
							<input
								autoComplete="off"
								type="text"
								value={values.gymLength || ""}
								name="gymLength"
								placeholder="w metrach"
								pattern="[0-9]+([\.,][0-9]+)?"
								min="1"
								onChange={handleChange}
								required
							/>
							{errors.gymLength && (
								<p className="help">{errors.gymLength}</p>
							)}
						</div>
					</div>
					<div className="container-2">
						<label>Szerokość</label>
						<div className="input-n-error">
							<input
								autoComplete="off"
								type="text"
								value={values.gymWidth || ""}
								name="gymWidth"
								placeholder="w metrach"
								pattern="[0-9]+([\.,][0-9]+)?"
								min="1"
								onChange={handleChange}
								required
							/>
							{errors.gymWidth && (
								<p className="help">{errors.gymWidth}</p>
							)}
						</div>
					</div>
					<div className="container-2">
						<label>Wysokość</label>
						<div className="input-n-error">
							<input
								autoComplete="off"
								type="text"
								value={values.gymHeight || ""}
								name="gymHeight"
								placeholder="w metrach"
								pattern="[0-9]+([\.,][0-9]+)?"
								min="1"
								onChange={handleChange}
								required
							/>
							{errors.gymHeight && (
								<p className="help">{errors.gymHeight}</p>
							)}
						</div>
					</div>
					<div className="container-2">
						<label>Liczba miejsc na widowni</label>
						<div className="input-n-error">
							<input
								autoComplete="off"
								type="number"
								value={values.audience || ""}
								name="audience"
								min="1"
								onChange={handleChange}
								required
							/>
							{errors.audience && (
								<p className="help">{errors.audience}</p>
							)}
						</div>
					</div>
					<div className="container-2">
						<label>Liczba szatń</label>
						<div className="input-n-error">
							<input
								autoComplete="off"
								type="number"
								value={values.changingRooms || ""}
								name="changingRooms"
								min="0"
								onChange={handleChange}
								required
							/>
							{errors.changingRooms && (
								<p className="help">{errors.changingRooms}</p>
							)}
						</div>
					</div>
					<div className="container-2">
						<label>Cena</label>
						<div className="input-n-error">
							<input
								autoComplete="off"
								type="text"
								value={values.gymPrice || ""}
								name="gymPrice"
								pattern="[0-9]+([\.,][0-9]{0,2})?"
								min="1"
								onChange={handleChange}
								required
							/>
							{errors.gymPrice && (
								<p className="help">{errors.gymPrice}</p>
							)}
						</div>
					</div>
					{/* ************************************************************************* */}
					<div className="container-2">
						<label>URL</label>
						<div className="input-n-error">
							<input
								autoComplete="off"
								type="text"
								value={values.gymURL || ""}
								name="gymURL"
								pattern="(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})"
								min="1"
								onChange={handleChange}
							/>
							{errors.gymURL && (
								<p className="help">{errors.gymURL}</p>
							)}
						</div>
					</div>

					<div className="container-2">
						<label>Telefon</label>
						<div className="input-n-error">
							<input
								autoComplete="off"
								type="text"
								value={values.gymPhone || ""}
								name="gymPhone"
								pattern="^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$"
								min="1"
								onChange={handleChange}
							/>
							{errors.gymPhone && (
								<p className="help">{errors.gymPhone}</p>
							)}
						</div>
					</div>

					<div className="container-2">
						<label>Email</label>
						<div className="input-n-error">
							<input
								autoComplete="off"
								type="text"
								value={values.gymEmail || ""}
								name="gymEmail"
								pattern="/^\S+@\S+\.\S+$/"
								min="1"
								onChange={handleChange}
							/>
							{errors.gymEmail && (
								<p className="help">{errors.gymEmail}</p>
							)}
						</div>
					</div>

					<div className="container-2">
						<label>Opis</label>
						<div className="input-n-error">
							<input
								autoComplete="off"
								type="text"
								value={values.gymDescription || ""}
								name="gymDescription"
								min="1"
								onChange={handleChange}
							/>
							{errors.gymDescription && (
								<p className="help">{errors.gymDescription}</p>
							)}
						</div>
					</div>
				</div>
				<div id="gallery" style={{ marginLeft: "21.3%" }}>
					<input
						type="file"
						multiple="multiple"
						id="img_url"
						onChange={handleImageAsFile}
					></input>
					{errors.gymPhoto && (
						<p className="help">{errors.gymPhoto}</p>
					)}
				</div>

				{/* TODO jeszcze z tym powalczę - z DragAndDrop */}
				{/* <div id="gallery">
          <DragAndDrop id="img_url" onChange={handleImageAsFile} />
        </div> */}
			</div>
			<button className="form_button">DODAJ</button>
		</form>
	);
}
