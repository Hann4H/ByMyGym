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
    } else if (!values.gymHeight) {
        verdict = false;
    } else if (!/[0-9]+([.,][0-9]+)?/.test(values.gymHeight)) {
        verdict = false;
    } else if (!values.gymWidth) {
        verdict = false;
    } else if (!/[0-9]+([.,][0-9]+)?/.test(values.gymWidth)) {
        verdict = false;
    } else if (!values.gymLength) {
        verdict = false;
    } else if (!/[0-9]+([.,][0-9]+)?/.test(values.gymLength)) {
        verdict = false;
    } else if (!values.audience) {
        verdict = false;
    } else if (!/[0-9]{1,3}/.test(values.audience)) {
        verdict = false;
    } else if (!values.changingRooms) {
        verdict = false;
    } else if (!/[0-9]{1,3}/.test(values.changingRooms)) {
        verdict = false;
    } else if (!values.gymPrice) {
        verdict = false;
    } else if (!/[0-9]{1,}/.test(values.gymPrice)) {
        verdict = false;
    } else {
        verdict = true;
    }
    // console.log(verdict);
    return verdict;
  };