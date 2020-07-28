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
      gymStreet: item.properties.adres,
      gymCity: item.properties.miasto,
      gymZip: item.properties.kod,
      gymURL: item.properties.url,
      gymPhone: item.properties.telefon,
      gymEmail: item.properties.email,
      gymPhoto: item.properties.grafika,
      gymDescription: item.properties.opis,
      gymLat: item.geometry.coordinates[1],
      gymLng: item.geometry.coordinates[0],
      id: item.id,
    })
  );

  return null;
}

export default JsonToFirebase;
