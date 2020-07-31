import { set } from "date-fns";


export default function validate(values) {
    let verdict = false;
    if (!values.gymName) {
      verdict = false;
    } else if (!/(.*[a-z]){3}/.test(values.gymName)) {
        verdict = false;
    } else {
        verdict = true;
    }
    // console.log(verdict);
    return verdict;
  };