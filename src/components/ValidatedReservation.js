export default function validate(values) {
    let verdict = false;
    if (!values.name) {
      verdict = false;
    } else if (!/(.*[a-z]){2}/.test(values.name)) {
        verdict = false;
    } else if (!values.surname) {
        verdict = false;
    } else if (!/(.*[a-z]){2}/.test(values.surname)) {
        verdict = false;
    } else if (!values.email) {
        verdict = false;
    } else if (!/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(values.email)) {
        verdict = false;
    } else if (!values.phoneNumber) {
        verdict = false;
    } else if (!/^(?:\(?\?)?(?:[-.()\s]*(\d)){9}\)?$/.test(values.phoneNumber)) {
        verdict = false;
    } else {
        verdict = true;
    }
    return verdict;
  };