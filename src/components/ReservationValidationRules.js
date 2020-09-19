export default function validate(values) {
    let errors = {};
    if (!values.name) {
      errors.name = 'Należy wprowadzić imię';
    } else if (!/(.*[A-Za-z]){3}/.test(values.name)) {
      errors.name = 'Imię jest nieprawidłowe';
    }
    if (!values.surname) {
      errors.surname = 'Należy wprowadzić nazwisko';
    } else if (!/(.*[A-Za-z]){3}/.test(values.surname)) {
      errors.surname = 'Nazwisko jest nieprawidłowe';
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Należy wprowadzić numer telefonu';
    } else if (!/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(values.phoneNumber)) {
      errors.phoneNumber = 'Numer telefonu jest nieprawidłowy';
    }
    if (!values.email) {
      errors.email = 'Należy wprowadzić e-mail';
    } else if (!/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(values.email)) {
      errors.email = 'E-mail jest nieprawidłowy';
    }
 

    // console.log(errors);
    return errors;
  };