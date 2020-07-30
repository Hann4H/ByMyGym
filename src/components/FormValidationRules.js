export default function validate(values) {
    let errors = {};
    if (!values.gymName) {
      errors.gymName = 'Email address is required';
    } else if (!/(.*[a-z]){3}/.test(values.gymName)) {
      errors.gymName = 'Email address is invalid';
    }
    return errors;
  };