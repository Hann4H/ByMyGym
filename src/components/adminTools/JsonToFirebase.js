import firebase from "../../firebase";

function JsonToFirebase(props) {
  const db = firebase.firestore();


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
