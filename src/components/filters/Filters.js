import React, { Component } from "react";
import GymItem from "../GymItem";
import firebase from "../../firebase";
const db = firebase.firestore();

const nameStyle = {
	fontWeight: "bold",
	color: "var(--darkOrange)",
	textTransform: "none",
};

const textStyle = {
	color: "#808080",
	width: "auto",
	display: "inline",
	margin: "5px",
	textTransform: "none",
};

const containerStyle = {
	marginLeft: "10%",
};

class Filters extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			gymPriceFrom: "0",
			gymPriceTo: "50000",
			gymHeightM: "",
			gymWidthM: "",
			gymLengthM: "",
			audienceN: "",
			changingRoomsN: "",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		db.collection("gyms")
			.orderBy("gymPrice")
			// .where("gymPrice", ">=", this.state.gymPriceFrom)
			// .where("gymPrice", "<=", this.state.gymPriceTo)
			.get()
			.then((snapshot) => {
				const links = snapshot.docs.map((doc) => {
					return { docId: doc.id, ...doc.data() };
				});
				this.setState({ data: links });
				this.gymData = links;
			});
	}

	handleChange = (event) => {
		event.persist();
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		// ************************************ 1 przypadek
		// wszystkie puste
		if (
			this.state.gymHeightM == "" &&
			this.state.gymWidthM == "" &&
			this.state.gymLengthM == "" &&
			this.state.audienceN == "" &&
			this.state.changingRoomsN == ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
			// ************************************ 5 przypadków
			// dlugosc nie pusta
		} else if (
			this.state.gymLengthM != "" &&
			this.state.gymWidthM == "" &&
			this.state.gymHeightM == "" &&
			this.state.audienceN == "" &&
			this.state.changingRoomsN == ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("gymLength", "==", this.state.gymLengthM)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
			// szeroksc nie pusta
		} else if (
			this.state.gymLengthM == "" &&
			this.state.gymWidthM != "" &&
			this.state.gymHeightM == "" &&
			this.state.audienceN == "" &&
			this.state.changingRoomsN == ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("gymWidth", "==", this.state.gymWidthM)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
			// wysokosc nie pusta
		} else if (
			this.state.gymLengthM == "" &&
			this.state.gymWidthM == "" &&
			this.state.gymHeightM != "" &&
			this.state.audienceN == "" &&
			this.state.changingRoomsN == ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("gymHeight", "==", this.state.gymHeightM)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
			// liczba miejsc nie puste
		} else if (
			this.state.gymLengthM == "" &&
			this.state.gymWidthM == "" &&
			this.state.gymHeightM == "" &&
			this.state.audienceN != "" &&
			this.state.changingRoomsN == ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("audience", "==", this.state.audienceN)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
			// liczba szatn nie pusta
		} else if (
			this.state.gymLengthM == "" &&
			this.state.gymWidthM == "" &&
			this.state.gymHeightM == "" &&
			this.state.audienceN == "" &&
			this.state.changingRoomsN != ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("changingRooms", "==", this.state.changingRoomsN)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
			// ************************************ 10 przypadków
			// długość i szerokość
		} else if (
			this.state.gymLengthM != "" &&
			this.state.gymWidthM != "" &&
			this.state.gymHeightM == "" &&
			this.state.audienceN == "" &&
			this.state.changingRoomsN == ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("gymLength", "==", this.state.gymLengthM)
				.where("gymWidth", "==", this.state.gymWidthM)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
			// dlugosc i wysokosc
		} else if (
			this.state.gymLengthM != "" &&
			this.state.gymWidthM == "" &&
			this.state.gymHeightM != "" &&
			this.state.audienceN == "" &&
			this.state.changingRoomsN == ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("gymLength", "==", this.state.gymLengthM)
				.where("gymHeight", "==", this.state.gymHeightM)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
			// dlugosc i liczba miejsc
		} else if (
			this.state.gymLengthM != "" &&
			this.state.gymWidthM == "" &&
			this.state.gymHeightM == "" &&
			this.state.audienceN != "" &&
			this.state.changingRoomsN == ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("gymLength", "==", this.state.gymLengthM)
				.where("audience", "==", this.state.audienceN)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
			// dlugosc i szatnie
		} else if (
			this.state.gymLengthM != "" &&
			this.state.gymWidthM == "" &&
			this.state.gymHeightM == "" &&
			this.state.audienceN == "" &&
			this.state.changingRoomsN != ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("gymLength", "==", this.state.gymLengthM)
				.where("changingRooms", "==", this.state.changingRoomsN)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
			// szerokosc i wysokosc
		} else if (
			this.state.gymLengthM == "" &&
			this.state.gymWidthM != "" &&
			this.state.gymHeightM != "" &&
			this.state.audienceN == "" &&
			this.state.changingRoomsN == ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("gymWidth", "==", this.state.gymWidthM)
				.where("gymHeight", "==", this.state.gymHeightM)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
			// szerokosc i liczba miejsc
		} else if (
			this.state.gymLengthM == "" &&
			this.state.gymWidthM != "" &&
			this.state.gymHeightM == "" &&
			this.state.audienceN != "" &&
			this.state.changingRoomsN == ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("gymWidth", "==", this.state.gymWidthM)
				.where("audience", "==", this.state.audienceN)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
			// szerokosc i szatnie
		} else if (
			this.state.gymLengthM == "" &&
			this.state.gymWidthM != "" &&
			this.state.gymHeightM == "" &&
			this.state.audienceN == "" &&
			this.state.changingRoomsN != ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("gymWidth", "==", this.state.gymWidthM)
				.where("changingRooms", "==", this.state.changingRoomsN)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
			// wysokosc i liczba miejsc
		} else if (
			this.state.gymLengthM == "" &&
			this.state.gymWidthM == "" &&
			this.state.gymHeightM != "" &&
			this.state.audienceN != "" &&
			this.state.changingRoomsN == ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("audience", "==", this.state.audienceN)
				.where("gymHeight", "==", this.state.gymHeightM)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
			// wysokosc i szatnie
		} else if (
			this.state.gymLengthM == "" &&
			this.state.gymWidthM == "" &&
			this.state.gymHeightM != "" &&
			this.state.audienceN == "" &&
			this.state.changingRoomsN != ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("changingRooms", "==", this.state.changingRoomsN)
				.where("gymHeight", "==", this.state.gymHeightM)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
			// liczba miejsc i szatnie
		} else if (
			this.state.gymLengthM == "" &&
			this.state.gymWidthM == "" &&
			this.state.gymHeightM == "" &&
			this.state.audienceN != "" &&
			this.state.changingRoomsN != ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("audience", "==", this.state.audienceN)
				.where("changingRooms", "==", this.state.changingRoomsN)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
			// ************************************ 10 przypadków
			// dlugosc, szerokosc, wysokosc;
		} else if (
			this.state.gymLengthM != "" &&
			this.state.gymWidthM != "" &&
			this.state.gymHeightM != "" &&
			this.state.audienceN == "" &&
			this.state.changingRoomsN == ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("gymLength", "==", this.state.gymLengthM)
				.where("gymWidth", "==", this.state.gymWidthM)
				.where("gymHeight", "==", this.state.gymHeightM)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
			// dlugosc, szerokosc, liczba miejsc
		} else if (
			this.state.gymLengthM != "" &&
			this.state.gymWidthM != "" &&
			this.state.gymHeightM == "" &&
			this.state.audienceN != "" &&
			this.state.changingRoomsN == ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("gymLength", "==", this.state.gymLengthM)
				.where("gymWidth", "==", this.state.gymWidthM)
				.where("audience", "==", this.state.audienceN)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
			// dlugosc, szerokosc, szatnie
		} else if (
			this.state.gymLengthM != "" &&
			this.state.gymWidthM != "" &&
			this.state.gymHeightM == "" &&
			this.state.audienceN == "" &&
			this.state.changingRoomsN != ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("gymLength", "==", this.state.gymLengthM)
				.where("gymWidth", "==", this.state.gymWidthM)
				.where("changingRooms", "==", this.state.changingRoomsN)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
			// dlugosc, wysokosc, liczba miejsc
		} else if (
			this.state.gymLengthM != "" &&
			this.state.gymWidthM == "" &&
			this.state.gymHeightM != "" &&
			this.state.audienceN != "" &&
			this.state.changingRoomsN == ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("gymLength", "==", this.state.gymLengthM)
				.where("gymHeight", "==", this.state.gymHeightM)
				.where("audience", "==", this.state.audienceN)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
			// dlugosc, wysokosc, szatnie
		} else if (
			this.state.gymLengthM != "" &&
			this.state.gymWidthM == "" &&
			this.state.gymHeightM != "" &&
			this.state.audienceN == "" &&
			this.state.changingRoomsN != ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("gymLength", "==", this.state.gymLengthM)
				.where("gymHeight", "==", this.state.gymHeightM)
				.where("changingRooms", "==", this.state.changingRoomsN)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
			// dlugosc, liczba miejs, szatnie
		} else if (
			this.state.gymLengthM != "" &&
			this.state.gymWidthM == "" &&
			this.state.gymHeightM == "" &&
			this.state.audienceN != "" &&
			this.state.changingRoomsN != ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("gymLength", "==", this.state.gymLengthM)
				.where("audience", "==", this.state.audienceN)
				.where("changingRooms", "==", this.state.changingRoomsN)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
			// szerokosc, wysokosc, liczba miejsc
		} else if (
			this.state.gymLengthM == "" &&
			this.state.gymWidthM != "" &&
			this.state.gymHeightM != "" &&
			this.state.audienceN != "" &&
			this.state.changingRoomsN == ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("gymWidth", "==", this.state.gymWidthM)
				.where("gymHeight", "==", this.state.gymHeightM)
				.where("audience", "==", this.state.audienceN)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
			// szerokosc, wysokosc, szatnie
		} else if (
			this.state.gymLengthM == "" &&
			this.state.gymWidthM != "" &&
			this.state.gymHeightM != "" &&
			this.state.audienceN == "" &&
			this.state.changingRoomsN != ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("gymWidth", "==", this.state.gymWidthM)
				.where("gymHeight", "==", this.state.gymHeightM)
				.where("changingRooms", "==", this.state.changingRoomsN)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
			// szerokosc, liczba miejsc, szatnie
		} else if (
			this.state.gymLengthM == "" &&
			this.state.gymWidthM != "" &&
			this.state.gymHeightM == "" &&
			this.state.audienceN != "" &&
			this.state.changingRoomsN != ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("gymWidth", "==", this.state.gymWidthM)
				.where("audience", "==", this.state.audienceN)
				.where("changingRooms", "==", this.state.changingRoomsN)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
			// wysokosc, liczba miejsc, szatnie
		} else if (
			this.state.gymLengthM == "" &&
			this.state.gymWidthM == "" &&
			this.state.gymHeightM != "" &&
			this.state.audienceN != "" &&
			this.state.changingRoomsN != ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("gymHeight", "==", this.state.gymHeightM)
				.where("audience", "==", this.state.audienceN)
				.where("changingRooms", "==", this.state.changingRoomsN)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});

			// ************************************ 5 przypadków
		} else if (
			this.state.gymLengthM != "" &&
			this.state.gymWidthM != "" &&
			this.state.gymHeightM != "" &&
			this.state.audienceN != "" &&
			this.state.changingRoomsN == ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("gymLength", "==", this.state.gymLengthM)
				.where("gymWidth", "==", this.state.gymWidthM)
				.where("gymHeight", "==", this.state.gymHeightM)
				.where("audience", "==", this.state.audienceN)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
		} else if (
			this.state.gymLengthM != "" &&
			this.state.gymWidthM != "" &&
			this.state.gymHeightM != "" &&
			this.state.audienceN == "" &&
			this.state.changingRoomsN != ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("gymLength", "==", this.state.gymLengthM)
				.where("gymWidth", "==", this.state.gymWidthM)
				.where("gymHeight", "==", this.state.gymHeightM)
				.where("changingRooms", "==", this.state.changingRoomsN)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
		} else if (
			this.state.gymLengthM != "" &&
			this.state.gymWidthM != "" &&
			this.state.gymHeightM == "" &&
			this.state.audienceN != "" &&
			this.state.changingRoomsN != ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("gymLength", "==", this.state.gymLengthM)
				.where("gymWidth", "==", this.state.gymWidthM)
				.where("audience", "==", this.state.audienceN)
				.where("changingRooms", "==", this.state.changingRoomsN)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
		} else if (
			this.state.gymLengthM != "" &&
			this.state.gymWidthM == "" &&
			this.state.gymHeightM != "" &&
			this.state.audienceN != "" &&
			this.state.changingRoomsN != ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("gymLength", "==", this.state.gymLengthM)
				.where("gymHeight", "==", this.state.gymHeightM)
				.where("audience", "==", this.state.audienceN)
				.where("changingRooms", "==", this.state.changingRoomsN)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
		} else if (
			this.state.gymLengthM == "" &&
			this.state.gymWidthM != "" &&
			this.state.gymHeightM != "" &&
			this.state.audienceN != "" &&
			this.state.changingRoomsN != ""
		) {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("gymWidth", "==", this.state.gymWidthM)
				.where("gymHeight", "==", this.state.gymHeightM)
				.where("audience", "==", this.state.audienceN)
				.where("changingRooms", "==", this.state.changingRoomsN)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
			// ************************************ 1 przypadek
		} else {
			db.collection("gyms")
				.orderBy("gymPrice")
				.where("gymPrice", ">=", this.state.gymPriceFrom)
				.where("gymPrice", "<=", this.state.gymPriceTo)
				.where("gymHeight", "==", this.state.gymHeightM)
				.where("gymWidth", "==", this.state.gymWidthM)
				.where("gymLength", "==", this.state.gymLengthM)
				.where("audience", "==", this.state.audienceN)
				.where("changingRooms", "==", this.state.changingRoomsN)
				.get()
				.then((snapshot) => {
					const links = snapshot.docs.map((doc) => {
						return { docId: doc.id, ...doc.data() };
					});
					this.setState({ data: links });
					this.gymData = links;
				});
		}
	};

	render() {
		console.log(this.state.data);
		return (
			<>
				<div style={containerStyle}>
					<br />
					<form onSubmit={this.handleSubmit}>
						<div style={{ display: "inline-block" }}>
							<label style={nameStyle}>
								Cena (zł):{" "}
								<label style={textStyle}>
									od
									<input
										style={textStyle}
										label="Od"
										placeholder="od"
										type="number"
										name="gymPriceFrom"
										onChange={this.handleChange}
										value={this.state.gymPriceFrom}
									/>
								</label>
								<label style={textStyle}>
									do
									<input
										style={textStyle}
										placeholder="do"
										type="number"
										name="gymPriceTo"
										onChange={this.handleChange}
										value={this.state.gymPriceTo}
									/>
								</label>
							</label>
						</div>
						<div>
							<label style={nameStyle}>
								Długość (m):{" "}
								<input
									style={textStyle}
									placeholder="w metrach"
									type="number"
									name="gymLengthM"
									onChange={this.handleChange}
									value={this.state.gymLengthM}
								/>
							</label>
						</div>
						<div>
							<label style={nameStyle}>
								Szerokość (m):{" "}
								<input
									style={textStyle}
									placeholder="w metrach"
									type="number"
									name="gymWidthM"
									onChange={this.handleChange}
									value={this.state.gymWidthM}
								/>
							</label>
						</div>
						<div>
							<label style={nameStyle}>
								Wysokość (m):{" "}
								<input
									style={textStyle}
									placeholder="w metrach"
									type="number"
									name="gymHeightM"
									onChange={this.handleChange}
									value={this.state.gymHeightM}
								/>
							</label>
						</div>
						<div>
							<label style={nameStyle}>
								Liczba miejsc na widowni:{" "}
								<input
									style={textStyle}
									placeholder=""
									type="number"
									name="audienceN"
									onChange={this.handleChange}
									value={this.state.audienceN}
								/>
							</label>
						</div>
						<div>
							<label style={nameStyle}>
								Liczba szatń:{" "}
								<input
									style={textStyle}
									placeholder=""
									type="number"
									name="changingRoomsN"
									onChange={this.handleChange}
									value={this.state.changingRoomsN}
								/>
							</label>
						</div>
						<br />
						<button type="submit" className="filter-button">Zastosuj</button>
						<p></p>
						<br />
					</form>
				</div>
				<div>
					{this.state.data.map((gym, index) => (
						<GymItem
							key={gym.id}
							showCount={false}
							gym={gym}
							index={index}
						/>
					))}
				</div>
			</>
		);
	}
}

export default Filters;
