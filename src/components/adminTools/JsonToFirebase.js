import firebase from "../../firebase";

function JsonToFirebase(props) {
	// const [Gyms, setGyms] = useState({});

	const db = firebase.firestore();

	// db.collection("gyms")
	// .get()
	// .then(snapshot => {
	// 	const Gyms = [];
	// 	snapshot.forEach(function (doc) {
	// 		Gyms.push({
	// 			gymName: doc.data().gymName,
	// 			gymStreet: doc.data().gymStreet,
	// 		});
	// 	});
	// 	setGyms({ Gyms });
	// 	console.log()
	// })

	console.log("Dodaję nieistniejące sale...");
	props.json.map((item) => {
		if (!props.gymNames.includes(item.properties.nazwa)) {
			// console.log("TAK: ", item.properties.nazwa);
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
				gymOwner: "",
				gymPrice: null,
				accepted: true,
				audience: null,
				changingRooms: null,
				gymWidth: null,
				gymLength: null,
				gymHeight: null,
			});
		}
	});

	return null;
}

export default JsonToFirebase;
