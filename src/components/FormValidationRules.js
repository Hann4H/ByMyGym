export default function validate(values) {
    let errors = {};
    if (!values.gymName) {
      errors.gymName = 'Należy wprowadzić nazwę sali';
    } else if (!/(.*[a-z]){3}/.test(values.gymName)) {
      errors.gymName = 'Nazwa sali jest nieprawidłowa - minimum 3 znaki';
    }
    if (!values.gymStreet) {
        errors.gymStreet = 'Należy wprowadzić ulicę';
      } else if (!/(.*[a-z]){3}/.test(values.gymStreet)) {
        errors.gymStreet = 'Nazwa ulicy jest nieprawidłowa - minimum 3 znaki';
      }
      console.log(errors);
    return errors;
  };