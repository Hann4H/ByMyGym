import React, { Component } from "react";
import firebase from "firebase";
import "../theme/react-week-scheduler.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie"
// import { Redirect } from 'react-router-dom'

import "../theme/OwnerManager.css";

const db = firebase.firestore();

class OwnerManager extends Component {
	constructor(props) {
		super(props);
		this.state = { ownedGyms: [] };
	}

	componentDidMount() {
		const ownedGyms = [];

		db.collection("gyms")
			.where("gymOwner", "==", Cookies.get('user'))
			.get()
			.then((items) => {
				items.forEach(function (doc) {
					doc.reservations = [];
					ownedGyms.push(doc);
				});

				ownedGyms.forEach((g) => {
					db.collection("reservation")
						.where("gym_id", "==", g.id)
						.get()
						.then((items) => {
							items.forEach((i) => {
								g.reservations.push(i);
							});
							this.setState({ ownedGyms: ownedGyms });
						});
				});
			});
	}

	render() {
		const ChangeStatus = (id) => {
			console.log(id);
			db.collection("reservation")
				.doc(id)
				.update({
					title: "Zarezerwowane",
					bgColor: "#90EE90",
					movable: false,
					resizable: false,
				})
				.then(function () {
					console.log("Status successfully changed! Doc: " + id);
					window.location.reload(false);
				})
				.catch(function (error) {
					console.error("Error changing status: ", error);
				});
		};

		const DeleteReservation = (id) => {
			db.collection("reservation")
				.doc(id)
				.delete()
				.then(function () {
					console.log("Document successfully deleted! Doc: " + id);
					window.location.reload(false);
				})
				.catch(function (error) {
					console.error("Error removing document: ", error);
				});
		};

		const renderGyms = this.state.ownedGyms.map((gym, i) => {
			return (
				<div className="gym_cont">
					<div className="gym_name_address">
						<div className="gym_name">{gym.data().gymName}</div>
						<div className="gym_address">
							{gym.data().gymStreet}
						</div>
					</div>
					<div className="reservations">
						{gym.reservations.length > 0 ? (
							gym.reservations.map((r) => {
								return (
									<div
										className="reservation"
									>
										<span>
											{r.data().name} {r.data().surname}
										</span>
										<span>Status: {r.data().title}</span>
										{r.data().longStart != null ? (
											<span>
												Od: {r.data().longStart}
											</span>
										) : (
											<span>Od: {r.data().start}</span>
										)}
										{r.data().longEnd != null ? (
											<span>Do: {r.data().longEnd}</span>
										) : (
											<span>Do: {r.data().end}</span>
										)}
										{r.data().weekdays != null ? (
											<span>
												{r.data().weekdays.join(", ")}
											</span>
										) : (
											<br />
										)}
										<span>{r.data().email}</span>
										<a href={"mailto:" + r.data().email} className="link">
											Napisz maila
										</a>
										<span>{r.data().phoneNumber}</span>
										<a href={"tel:" + r.data().phoneNumber} className="link">
											Zadzwoń
										</a>
										<button
											className="change_status"
											onClick={function (e) {
												ChangeStatus(r.id);
											}}
										>
											{" "}
											Zaakceptuj{" "}
										</button>
										<button
											className="delete_btn"
											onClick={function (e) {
												DeleteReservation(r.id);
											}}
										>
											{" "}
											Usuń{" "}
										</button>
									</div>
								);
							})
						) : (
							<div>Nie ma zadnej Rezerwacji </div>
						)}
					</div>
				</div>
			);
		});

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
						Twoje sale
					</h1>
					<div className="gyms_container">{renderGyms}</div>
				</div>
			</div>
		);
	}
}

export default OwnerManager;
