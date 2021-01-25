import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import firebase from "../firebase";
import Loading from "../components/Loading";
import StarRatings from "../components/StarRatings";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Cookies from "js-cookie"

var now = new Date();
var timeNow =
	now.getFullYear() +
	"-" +
	now.getMonth() +
	1 +
	"-" +
	now.getDate() +
	" " +
	now.getHours() +
	":" +
	now.getMinutes();

class Profile extends Component {
	state = {
		user: [],
		error: "",
		name: "",
		Reservations: [],
		Gyms: [],
		Favourites: [],
		seen: false,
		loading: false,
		Owned: [],
		owner: false,
	};

	componentDidMount() {
		const Reservations = [];
		const Gyms = [];
		const Favourites = [];

		this.loadUserProfile();

		if (Cookies.get('user')) {
			firebase
			.firestore()
			.collection("gyms")
			.get()
			.then((querySnapshot) => {
				this.setState({ loading: true });
				querySnapshot.forEach(function (doc) {
					Gyms.push({
						docId: doc.id,
						gymName: doc.data().gymName,
						gymOwner: doc.data().gymOwner,
						gymStreet: doc.data().gymStreet,
						accepted: doc.data().accepted,
					});
				});
				this.setState({ Gyms });
			})
			.then(() => {
				Gyms.map((gym) => {
					if (gym.gymOwner == Cookies.get('user')) {
						this.setState({ owner: true });
					}
				});
			})
			.catch(function (error) {
				console.log("Error getting documents: ", error);
			});

		firebase
			.firestore()
			.collection("reservation")
			.where("user_id", "==", Cookies.get('user'))
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach(function (doc) {
					Reservations.push({
						start: doc.data().start,
						end: doc.data().end,
						gym_id: doc.data().gym_id,
						scored: doc.data().scored,
						status: doc.data().title,
						bookingID: doc.id,
						user_id: doc.data().user_id,
						weekdays: doc.data().weekdays || null,
						longStart: doc.data().longStart || null,
						longEnd: doc.data().longEnd || null,
					});
				});

				this.setState({ Reservations });
			})
			.catch(function (error) {
				console.log("Error getting documents: ", error);
			});

		firebase
			.firestore()
			.collection("favourites")
			.doc(Cookies.get('user'))
			.get()
			.then((querySnapshot) => {
				this.setState({
					Favourites: this.state.Favourites.concat(
						querySnapshot.data().favourites
					),
				});
			})
			.catch(function (error) {
				console.log("Error getting documents: ", error);
			});

		firebase
			.firestore()
			.collection("users")
			.where("email", "==", Cookies.get('user'))
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					this.setState({
						name: doc.data().firstName + " " + doc.data().surname,
					});
				});
			});
		}

		
	}

	loadUserProfile() {
		const user = Cookies.get('user');
		this.setState({ user });
		this.setState({ name: Cookies.get('user_name') });
	}

	togglePop = () => {
		this.setState({
			seen: !this.state.seen,
		});
	};

	deleteRes(bookingID) {
		firebase.firestore()
		.collection("reservation")
			.doc(bookingID)
			.delete()
			.then(function () {
				console.log("Document successfully deleted! Doc: " + bookingID);
				window.location.reload(false);
			})
			.catch(function (error) {
				console.error("Error removing document: ", error);
			});


	}


	popAlert(bookingID) {
		confirmAlert({
			title: 'Czy na pewno chcesz usunąć tę rezerwację?',
			buttons: [
			  {
				label: 'TAK',
				onClick: () => this.deleteRes(bookingID)
			  },
			  {
				  label: 'NIE'
			  }
			]
		  })
	}

	render() {
		let { user } = this.state;
		if (!Cookies.get('user')) {
			return <Redirect to="/login" />;
		}

		const owner = this.state.owner;

		return (
			<>
				<div className="login-page">
					<div className="login-wave"></div>
					<div className="profile-container">
						<div className="profile-div">
							<img
								className="profile-picture"
								src={Cookies.get('photoURL')}
								alt="zdjęcie profilowe"
							/>
							<h1>{this.state.name}</h1>
						</div>
						<div className="profile-info-table">
							<table className="table table-borderless">
								<tbody>
									<tr className="profile-info">
										<td className="headline-info">Imię</td>
										<td>{this.state.name}</td>
									</tr>
									<tr className="profile-info">
										<td className="headline-info">Email</td>
										<td>{Cookies.get('email')}</td>
									</tr>
									<p style={{ height: 10 }} />
									<tr className="profile-info">
										<td className="headline-info">
											Rezerwacje
										</td>
									</tr>
								</tbody>
							</table>
							<table>
								<tbody>
									<div className="gyms-load">
										{this.state.loading ? null : (
											<Loading />
										)}
									</div>
									<div className="profile-bookings">
										{this.state.Reservations.filter(
											(reserv) => timeNow < reserv.end
										).map((res, index) =>
											this.state.Gyms.filter(
												(gym) =>
													gym.docId == res.gym_id &&
													gym.gymOwner != res.user_id
											).map((filteredName) => (
												<tr>
													<Link
														to={`/gym_profile/${res.gym_id}`}
													>
														<td>
															{
																filteredName.gymName
															}
														</td>
													</Link>
													<td>
														<p
															className="profile-bookings-p"
															style={
																res.status ===
																"Zarezerwowane"
																	? {
																			color:
																				"#90EE90",
																	  }
																	: {
																			color:
																				"#FFD700",
																	  }
															}
														>
															{res.status}
														</p>
														{!(
															Cookies.get('user') ==
															process.env
																.REACT_APP_ADMIN_ID
														) &&
														res.start < timeNow &&
														res.status ===
															"Zarezerwowane" ? (
															// && (res.start < timeNow)
															<StarRatings
																gymID={
																	res.gym_id
																}
																bookingID={
																	res.bookingID
																}
															/>
														) : (
															<StarRatings
																gymID={
																	res.gym_id
																}
																bookingID={
																	res.bookingID
																}
																disabled={true}
															/>
														)}
													<td><button className="profile-bookings-button" onClick={() => this.popAlert(res.bookingID)} style={{ color: 'black' }}>USUŃ</button></td>
													</td>
													{res.longStart != null ? (
														<>
															<td>
																Od:{" "}
																{res.longStart}
															</td>
															<td>
																Do:{" "}
																{res.longEnd}
															</td>
														</>
													) : (
														<>
															<td>
																Od: {res.start}
															</td>
															<td>
																Do: {res.end}
															</td>
														</>
													)}
													{res.weekdays != null ? (
														// res.weekdays.map(w => (
														//   <tr>{w}</tr>
														// ))
														<tr>
															{res.weekdays.join(
																", "
															)}
														</tr>
													) : (
														""
													)}

													{/* <button className="profile-bookings-change-button">ZMIEŃ</button> */}

													{/* <td><p className="profile-bookings-delete">USUŃ</p></td> */}
												</tr>
											))
										)}
									</div>
								</tbody>
							</table>
							{!(
								Cookies.get('user') ==
								process.env.REACT_APP_ADMIN_ID
							) ? (
								<div>
									<table className="table table-borderless">
										<tbody>
											<tr className="profile-info">
												<td className="headline-info">
													Ulubione
												</td>
											</tr>
										</tbody>
									</table>
									<table>
										<tbody>
											<div className="gyms-load">
												{this.state.loading ? null : (
													<Loading />
												)}
											</div>
											<div className="profile-bookings">
												{this.state.Favourites.map(
													(fav, index) =>
														this.state.Gyms.filter(
															(gym) =>
																gym.docId == fav
														).map(
															(filteredName) => (
																<tr>
																	<Link
																		to={`/gym_profile/${fav}`}
																	>
																		<td>
																			{
																				filteredName.gymName
																			}
																		</td>
																	</Link>
																</tr>
															)
														)
												)}
											</div>
										</tbody>
									</table>
								</div>
							) : (
								""
							)}
							{owner ? (
								<div>
									<table className="table table-borderless">
										<tbody>
											<tr className="profile-info">
												<td className="headline-info">
													Moje sale
												</td>
												<Link to="/ownerManager">
													<button className="profile-gyms-show">
														Pokaż rezerwacje
													</button>
												</Link>
											</tr>
										</tbody>
									</table>
									<table>
										<tbody>
											<div className="gyms-load">
												{this.state.loading ? null : (
													<Loading />
												)}
											</div>
											<div className="profile-bookings">
												{this.state.Gyms.filter(
													(gym) =>
														gym.gymOwner ==
														Cookies.get('user')
												).map((myGyms) => (
													<tr>
														<Link
															to={`/gym_profile/${myGyms.docId}`}
														>
															<td>
																{myGyms.gymName}
															</td>
														</Link>
														<Link
															to={`/gym_profile/${myGyms.docId}`}
														>
															<button className="profile-gyms-accept-button">
																Przejdź
															</button>
														</Link>
														{/* <Link to='/reservations'><button className="profile-gyms-accept-button">Rezerwacje</button></Link> */}
														{!myGyms.accepted ? (
															<td>
																<p className="profile-gyms-status">
																	W trakcie
																	akceptacji
																</p>
															</td>
														) : (
															""
														)}
													</tr>
												))}
											</div>
										</tbody>
									</table>
								</div>
							) : (
								""
							)}
						</div>
					</div>
				</div>
				<pre style={{ display: "none" }}>
					{JSON.stringify(user, null, 2)}
				</pre>
			</>
		);
	}
}

export default Profile;
