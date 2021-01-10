import validator from "validator";

export default function validate(values) {
    let errors = {};
    if (!values.gymName) {
      errors.gymName = 'Należy wprowadzić nazwę sali';
    } else if (!/(.*[A-Za-z]){3}/.test(values.gymName)) {
      errors.gymName = 'Nazwa sali jest nieprawidłowa - minimum 3 znaki';
    }
    if (!values.gymStreet) {
      errors.gymStreet = 'Należy wprowadzić ulicę';
    } else if (!/(.*[A-Za-z]){3}/.test(values.gymStreet)) {
      errors.gymStreet = 'Nazwa ulicy jest nieprawidłowa - minimum 3 znaki';
    }
    if (!values.gymCity) {
      errors.gymCity = 'Należy wprowadzić miasto';
    } else if (!/(.*[A-Za-z]){3}/.test(values.gymCity)) {
      errors.gymCity = 'Nazwa miasta jest nieprawidłowa - minimum 3 znaki';
    }
    if (!values.gymZip) {
      errors.gymZip = 'Należy wprowadzić kod pocztowy';
    } else if (!/^\d{2}-\d{3}$/.test(values.gymZip)) {
      errors.gymZip = 'Kod pocztowy jest nieprawidłowy';
    }
    if (!values.gymHeight) {
      errors.gymHeight = 'Należy wprowadzić wysokość';
    } else if (!/^(?=.*[1-9])[1-9]{1,3}(?:\.\d\d?)?$/.test(values.gymHeight) || values.gymHeight <= 0) {
      errors.gymHeight = 'Wysokość jest nieprawidłowa';
    }
    if (!values.gymWidth) {
      errors.gymWidth = 'Należy wprowadzić szerokość';
    } else if (!/^(?=.*[1-9])[1-9]{1,3}(?:\.\d\d?)?$/.test(values.gymWidth) || values.gymWidth <= 0) {
      errors.gymWidth = 'Szerokość jest nieprawidłowa';
    }
    if (!values.gymLength) {
      errors.gymLength = 'Należy wprowadzić długość';
    } else if (!/^(?=.*[1-9])[1-9]{1,3}(?:\.\d\d?)?$/.test(values.gymLength) || values.gymLength <= 0) {
      errors.gymLength = 'Długość jest nieprawidłowa';
    }
    if (!values.audience) {
      errors.audience = 'Należy wprowadzić ilość miejsc na widowni';
    } else if (!/^(?=.*[0-9])[0-9]{1,3}$/.test(values.audience) || values.audience < 0) {
      errors.audience = 'Liczba jest nieprawidłowa';
    }
    if (!values.changingRooms) {
      errors.changingRooms = 'Należy wprowadzić ilość szatń';
    } else if (!/^(?=.*[0-9])[0-9]{1,3}$/.test(values.changingRooms) || values.changingRooms < 0) {
      errors.changingRooms = 'Liczba jest nieprawidłowa';
    }
    if (!values.gymPrice) {
      errors.gymPrice = 'Należy wprowadzić cenę';
    } else if (!/^\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})?$/.test(values.gymPrice) || values.gymPrice <= 0) {
      errors.gymPrice = 'Cena jest nieprawidłowa';
    }
    if (!values.gymEmail) {
      errors.gymEmail = 'Należy wprowadzić e-mail';
    } else if (!validator.isEmail(values.gymEmail)) {
      errors.gymEmail = 'E-mail jest nieprawidłowy';
    }
    if (!values.gymPhone) {
      errors.gymPhone = 'Należy wprowadzić numer kontaktowy';
    } else if (!validator.isMobilePhone(values.gymPhone, "pl-PL")) {
      errors.gymPhone = 'Numer jest nieprawidłowy';
    }
    if (!/^$|^(https?:\/\/(?:www\.|(?!www)))?[a-zA-Z0-9][a-zA-Z0-9-]+\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}$/.test(values.gymURL)) {
      errors.gymURL = 'URL jest nieprawidłowy';
    }
    return errors;
  };