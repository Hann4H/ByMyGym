export default function validated(values) {
    let verdict = false;
    if (!values.gymName) {
        verdict = false;
    } else {verdict = true;};

    if (!/(.*[a-z]){3}/.test(values.gymName)) {
        verdict = false;
    } else {verdict = true;};

    return verdict;
  };