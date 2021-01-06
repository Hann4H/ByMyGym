import validator from "validator";

// https://www.npmjs.com/package/validator

/*
 * This class contains methods for validating fields using 'validator.js' library methods
 * The methods return error message if validation failed and false otherwise
 * You can use all supported validators and sanitizers of 'validator.js' libaray
 * See their docs here https://github.com/validatorjs/validator.js
 */

class ValidateFields {
	/*
	 * A method that takes in the email
	 * Validates it
	 * Returns the response either error or false if there is no error
	 */
	validateEmail(email) {
		if (validator.isEmpty(email)) {
			return "Email jest wymagany";
		} else if (!validator.isEmail(email)) {
			return "Niepoprawny e-mail";
		}
		return false;
	}

	// validatePassword(password) {
	//   if (validator.isEmpty(password)) {
	//     return "Password is required";
	//   } else if (!validator.isLength(password, { min: 8 })) {
	//     return "Password should be minimum 8 characters";
	//   }
	//   return false;
	// }

	// ******************************

	validateName(name) {
		if (validator.isEmpty(name)) {
			return "Imię jest wymagane";
		} else if (!validator.isLength(name, { min: 2 })) {
			return "Imię powinno zawierać minimum 2 litery";
		}
		return false;
	}

	validateSurname(surname) {
		if (validator.isEmpty(surname)) {
			return "Nazwisko jest wymagane";
		} else if (!validator.isLength(surname, { min: 2 })) {
			return "Nazwisko powinno zawierać minimum 2 litery";
		}
		return false;
	}

	validatePhoneNumber(phoneNumber) {
		if (validator.isEmpty(phoneNumber)) {
			return "Telefon jest wymagany";
		} else if (!validator.isMobilePhone(phoneNumber, "pl-PL")) {
			return "Niepoprawny telefon";
		}
		return false;
	}

	// gym profile data
	validateGymName(gymName) {
		if (validator.isEmpty(gymName)) {
			return "Nazwa budynku jest wymagana";
		} else if (!validator.isLength(gymName, { min: 2 })) {
			return "Nazwa budynku powinna zawierać minimum 2 litery";
		}
		return false;
	}

	validateGymStreet(gymStreet) {
		if (validator.isEmpty(gymStreet)) {
			return "Ulica jest wymagana";
		} else if (!validator.isLength(gymStreet, { min: 2 })) {
			return "Ulica powinna zawierać minimum 2 litery";
		}
		return false;
	}

	validateGymCity(gymCity) {
		if (validator.isEmpty(gymCity)) {
			return "Miasto jest wymagane";
		} else if (!validator.isLength(gymCity, { min: 2 })) {
			return "Miasto powinno zawierać minimum 2 litery";
		}
		return false;
	}

	validateGymZip(gymZip) {
		if (validator.isEmpty(gymZip)) {
			return "Kod pocztowy jest wymagany";
		} else if (!validator.isPostalCode(gymZip, "PL")) {
			return "Proszę wprowadzić kod pocztowy w poprawnym formacie: 11-111";
		}
		return false;
	}

	validateGymHeight(gymHeight) {
		if (validator.isEmpty(gymHeight)) {
			return "Wysokość jest wymagana";
		} else if (!validator.isNumeric(gymHeight, "pl-PL")) {
			return "Proszę wprowadzić liczbę";
		}
		return false;
	}

	validateGymWidth(gymWidth) {
		if (validator.isEmpty(gymWidth)) {
			return "Szerokość jest wymagana";
		} else if (!validator.isNumeric(gymWidth, "pl-PL")) {
			return "Proszę wprowadzić liczbę";
		}
		return false;
	}

	validateGymLength(gymLength) {
		if (validator.isEmpty(gymLength)) {
			return "Długość jest wymagana";
		} else if (!validator.isNumeric(gymLength, "pl-PL")) {
			return "Proszę wprowadzić liczbę";
		}
		return false;
	}

	validateGymPrice(gymPrice) {
		if (validator.isEmpty(gymPrice)) {
			return "Cena jest wymagana";
		} else if (!validator.isCurrency(gymPrice)) {
			return "Cena wpisana w niepoprawnej postaci";
		}
		return false;
	}

	validateAudience(audience) {
		if (validator.isEmpty(audience)) {
			return "Liczba miejsc na widowni jest wymagana";
		} else if (!validator.isNumeric(audience, "pl-PL")) {
			return "Proszę wprowadzić liczbę";
		}
		return false;
	}

	validateChangingRooms(changingRooms) {
		if (validator.isEmpty(changingRooms)) {
			return "Proszę wprowadzić ilość szatń";
		} else if (!validator.isNumeric(changingRooms, "pl-PL")) {
			return "Proszę wprowadzić liczbę";
		}
		return false;
	}

	validateGymURL(gymURL) {
		if (validator.isEmpty(gymURL)) {
			return "Adres strony internetowej jest wymagany";
		} else if (!validator.isURL(gymURL)) {
			return "URL jest wprowadzony w nieprawidłowym formacie";
		}
		return false;
	}

	validateGymPhone(gymPhone) {
		if (validator.isEmpty(gymPhone)) {
			return "Telefon jest wymagany";
		} else if (!validator.isMobilePhone(gymPhone, "pl-PL")) {
			return "Telefon jest wprowadzony w nieprawidłowym formacie";
		}
		return false;
	}

	validateGymEmail(gymEmail) {
		if (validator.isEmpty(gymEmail)) {
			return "Email jest wymagany";
		} else if (!validator.isEmail(gymEmail)) {
			return "Niepoprawny e-mail";
		}
		return false;
	}

	validateGymDescription(gymDescription) {
		if (validator.isEmpty(gymDescription)) {
			return "Opis jest wymagany";
		}
		return false;
	}

	validateGymOwner(gymOwner) {
		if (validator.isEmpty(gymOwner)) {
			return false;
		} else if (!validator.isLength(gymOwner, { min: 20 })) {
			return "ID właściciela powinno mieć 20 znaków";
		}
		return false;
	}
}

const validateFields = new ValidateFields();

// export the class instance, so we can import and use it anywhere
export { validateFields };
