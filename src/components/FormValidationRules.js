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
    } else if (!/^(?=.*[1-9])[1-9]{1,3}(?:\.\d\d?)?$/.test(values.gymHeight)) {
      errors.gymHeight = 'Wysokość jest nieprawidłowa';
    }
    if (!values.gymWidth) {
      errors.gymWidth = 'Należy wprowadzić szerokość';
    } else if (!/^(?=.*[1-9])[1-9]{1,3}(?:\.\d\d?)?$/.test(values.gymWidth)) {
      errors.gymWidth = 'Szerokość jest nieprawidłowa';
    }
    if (!values.gymLength) {
      errors.gymLength = 'Należy wprowadzić długość';
    } else if (!/^(?=.*[1-9])[1-9]{1,3}(?:\.\d\d?)?$/.test(values.gymLength)) {
      errors.gymLength = 'Długość jest nieprawidłowa';
    }
    if (!values.audience) {
      errors.audience = 'Należy wprowadzić ilość miejsc na widowni';
    } else if (!/^(?=.*[0-9])[0-9]{1,3}$/.test(values.audience)) {
      errors.audience = 'Liczba jest nieprawidłowa';
    }
    if (!values.changingRooms) {
      errors.changingRooms = 'Należy wprowadzić ilość szatń';
    } else if (!/^(?=.*[0-9])[0-9]{1,3}$/.test(values.changingRooms)) {
      errors.changingRooms = 'Liczba jest nieprawidłowa';
    }
    if (!values.gymPrice) {
      errors.gymPrice = 'Należy wprowadzić cenę';
    } else if (!/^(?=.*[1-9])[0-9]{1,}$/.test(values.gymPrice)) {
      errors.gymPrice = 'Cena jest nieprawidłowa';
    }      
    return errors;
  };