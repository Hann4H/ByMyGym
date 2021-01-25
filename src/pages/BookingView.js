import React, { Component } from "react";
import firebase from "firebase";
import "../theme/react-week-scheduler.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie"
const db = firebase.firestore();

// bookings

function ListItems(props) {
	const data = JSON.parse(props.value);
	const docId = data.docId;

	function DeleteItemFromFirebase(e) {
		e.preventDefault();
		db.collection("reservation")
			.doc(docId)
			.delete()
			.then(function () {
				console.log("Document successfully deleted! Doc: " + docId);
				window.location.reload(false);
			})
			.catch(function (error) {
				console.error("Error removing document: ", error);
			});
	}

	function ChangeStatus(e) {
		e.preventDefault();
		console.log("change status run");
		db.collection("reservation")
			.doc(docId)
			.update({
				title: "Zarezerwowane",
				bgColor: "#90EE90",
				movable: false,
				resizable: false,
			})
			.then(function () {
				console.log("Status successfully changed! Doc: " + docId);
				window.location.reload(false);
			})
			.catch(function (error) {
				console.error("Error changing status: ", error);
			});
	}

	return (
		<>
			<div style={{ border: "2px solid var(--darkOrange)" }}>
				<table style={{ width: "100%", margin: "10px" }}>
					<tbody>
						<tr>
							<td>Data dodania</td>
							<td>
								{data.reservation_date
									? data.reservation_date
									: ""}
							</td>
						</tr>
						<tr>
							<td>Status rezerwacji</td>
							<td
								style={
									data.title === "Zarezerwowane"
										? { color: "#90EE90" }
										: { color: "#FFD700" }
								}
							>
								<b>{data.title}</b>
							</td>
						</tr>
						<tr>
							<td>Czas rezerwacji</td>
							<td>
								{data.start} - {data.end}
							</td>
						</tr>
						{data.rrule ? (
							<tr>
								<td>RRule</td>
								<td>{data.rrule}</td>
							</tr>
						) : (
							""
						)}
						<tr>
							<td>Imię Nazwisko</td>
							<td>
								{data.name} {data.surname}
							</td>
						</tr>
						<tr>
							<td>E-mail</td>
							<td>{data.email}</td>
						</tr>
						<tr>
							<td>Telefon</td>
							<td>{data.phoneNumber}</td>
						</tr>
						<tr>
							<td>Budynek ID</td>
							<td>{data.gym_id}</td>
						</tr>
						<tr>
							<td>Rezerwacja ID</td>
							<td>{data.docId}</td>
						</tr>
					</tbody>
				</table>
				<button
					style={{ margin: "10px", color: "white" }}
					onClick={DeleteItemFromFirebase}
				>
					Usuń
				</button>
				{data.title == 'Zarezerwowane' ? null : (
					<button
					style={{ margin: "10px", color: "white" }}
					onClick={ChangeStatus}
					>
					Zaakceptuj
					</button>
				)}
				<Link
					to={{
						pathname: `/gym_profile/${data.gym_id}`,
					}}
				>
					<button style={{ margin: "10px", color: "white" }}>
						Więcej informacji
					</button>
				</Link>
			</div>
			<br />
		</>
	);
}

class BookingView extends Component {
	constructor(props) {
		super(props);
		this.state = { bookingItems: [] };
	}

	componentDidMount() {
		db.collection("reservation")
			.orderBy("title")
			.get()
			.then((items) => {
				const bookingItems = items.docs.map((doc) => {
					return { docId: doc.id, ...doc.data() };
				});
				this.setState({ bookingItems: bookingItems });
				this.bookingItems = bookingItems;
			});
	}

	render() {
		if (Cookies.get('user') != process.env.REACT_APP_ADMIN_ID) {
			return <Redirect to="/login" />;
		}

		return (
			<div>
				<div id="pls"></div>
				<div className="admin-page">
					<h1
						style={{
							textAlign: "center",
							color: "var(--darkOrange)",
						}}
					>
						Zarządzaj rezerwacją
					</h1>
					{this.state.bookingItems.map((item, index) => (
						<ListItems
							key={index}
							value={JSON.stringify(item, null, 4)}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default BookingView;
