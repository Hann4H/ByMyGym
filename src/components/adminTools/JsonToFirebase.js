import firebase from "../../firebase";
import moment from "moment";

function JsonToFirebase(props) {
  const db = firebase.firestore();

  const hoursObj = {
    "07:00": false,
    "08:00": false,
    "09:00": false,
    "10:00": false,
    "11:00": false,
    "12:00": false,
    "13:00": false,
    "14:00": false,
    "15:00": false,
    "16:00": false,
    "17:00": false,
    "18:00": false,
    "19:00": false,
    "20:00": false,
  };

  function iterateDays() {
    var a = moment("2020-06-22");
    var b = moment("2022-10-01");
    let array = [];

    for (var m = moment(a); m.isBefore(b); m.add(1, "days")) {
      array.push([m.format("DD.MM"), { hoursObj }]);
    }
    console.log(array);
    return array;
  }

  props.json.map((item) =>
    db.collection("gyms").add({
      gymName: item.properties.nazwa,
      street: item.properties.adres,
      city: item.properties.miasto,

      id: item.id,
      kod: item.properties.kod,
      url: item.properties.url,
      opis_klasy: item.properties.opis_klasy,
      telefon: item.properties.telefon,
      email: item.properties.email,
      grafika: item.properties.grafika,
      opis: item.properties.opis,
      lat: item.geometry.coordinates[1],
      lng: item.geometry.coordinates[0],

      nazwa: item.properties.nazwa,
      adres: item.properties.adres,
      miasto: item.properties.miasto,
    })
  );

  return null;
}

export default JsonToFirebase;
