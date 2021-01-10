import validator from "validator";

export default function validate(values) {
	let verdict = false;
	if (!values.gymName) {
		verdict = false;
	} else if (!/(.*[a-z]){3}/.test(values.gymName)) {
		verdict = false;
	} else if (!values.gymStreet) {
		verdict = false;
	} else if (!/(.*[a-z]){3}/.test(values.gymStreet)) {
		verdict = false;
	} else if (!values.gymCity) {
		verdict = false;
	} else if (!/(.*[a-z]){3}/.test(values.gymCity)) {
		verdict = false;
	} else if (!values.gymZip) {
		verdict = false;
	} else if (!/^\d{2}-\d{3}$/.test(values.gymZip)) {
		verdict = false;
	} else if (!values.gymHeight || values.gymHeight <= 0) {
		verdict = false;
	} else if (!/^(?=.*[1-9])[1-9]{1,3}(?:\.\d\d?)?$/.test(values.gymHeight)) {
		verdict = false;
	} else if (!values.gymWidth || values.gymWidth <= 0) {
		verdict = false;
	} else if (!/^(?=.*[1-9])[1-9]{1,3}(?:\.\d\d?)?$/.test(values.gymWidth)) {
		verdict = false;
	} else if (!values.gymLength || values.gymLength <= 0) {
		verdict = false;
	} else if (!/^(?=.*[1-9])[1-9]{1,3}(?:\.\d\d?)?$/.test(values.gymLength)) {
		verdict = false;
	} else if (!values.audience || values.audience < 0) {
		verdict = false;
	} else if (!/^(?=.*[0-9])[0-9]{1,3}$/.test(values.audience)) {
		verdict = false;
	} else if (!values.changingRooms || values.changingRooms < 0) {
		verdict = false;
	} else if (!/^(?=.*[0-9])[0-9]{1,3}$/.test(values.changingRooms)) {
		verdict = false;
	} else if (!values.gymPrice || values.gymPrice <= 0) {
		verdict = false;
	} else if (!/^(?=.*[1-9])[0-9]{1,}$/.test(values.gymPrice)) {
		verdict = false;
	} else if (!values.gymPhone) {
		verdict = false;
	} else if (!validator.isMobilePhone(values.gymPhone, "pl-PL")) {
		verdict = false;
	} else if (!values.gymEmail) {
		verdict = false;
	} else if (!validator.isEmail(values.gymEmail)) {
		verdict = false;
	} else if (!values.gymURL) {
		verdict = true;
	} else if (values.gymURL && !validator.isURL(values.gymURL)) {
		verdict = false;
		// } else if (!/^$|^https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}$/.test(values.gymURL)) {
		//     verdict = false;
	} else if (!values.gymDescription) {
		verdict = true;
	} else {
		verdict = true;
	}
	return verdict;
}
