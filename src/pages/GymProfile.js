import React, { Component } from "react";
import Slider from "../components/Slider";
import GymDetails from "../components/GymDetails";
import GymDetailsEdit from "../components/GymDetailsEdit";
import Basic from "../components/calendar/Basic";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import ShowScheduler from "../components/calendar/ShowScheduler";
import Cookies from "js-cookie"

import firebase from "../firebase";

const db = firebase.firestore();

class GymProfile extends Component {
	constructor(props) {
		super(props);
		this.state = { data: [], editMode: false };
		this.showing = false;
		this.selectedBooking = null;
		this.gymOwner = "";
		this.setEditReadmode = this.setEditReadMode.bind(this);
	}

	componentDidMount() {
		firebase
			.firestore()
			.collection("gyms")
			.doc(this.props.match.params.id)
			.get()
			.then((snapshot) => {
				this.setState({ gymOwner: snapshot.data().gymOwner });
				console.log("id: " + snapshot.data().gymOwner);
			})
			.catch(function (error) {
				console.log("Error getting documents: ", error);
			});
	}

	setEditReadMode = () => {
		this.setState({ editMode: !this.state.editMode });
	};

	render() {
		return (
			<>
				<div id="idk3"></div>
				<div id="idk4">
					<div id="sup">
						<Slider dataId={this.props.match.params.id} />
					</div>

					{Cookies.get('user') != this.state.gymOwner &&
					Cookies.get('user') !=
						process.env.REACT_APP_ADMIN_ID ? (
						""
					) : (
						<button
							onClick={this.setEditReadMode}
							style={{
								margin: "5%",
								float: "left",
								color: "white",
							}}
						>
							{this.state.editMode ? "Podgląd" : "Edytuj"}
						</button>
					)}

					{this.state.editMode ? (
						<div className="container-4">
							<div id="constrain">
								<GymDetailsEdit
									dataId={this.props.match.params.id}
								/>
							</div>
						</div>
					) : (
						<div>
							<div className="container-4">
								<div id="constrain">
									<GymDetails
										dataId={this.props.match.params.id}
									/>
								</div>
							</div>
							<div className="calendar-position">
								<DndProvider backend={HTML5Backend}>
									<ShowScheduler
										gym_id={this.props.match.params.id}
									/>
								</DndProvider>
							</div>
							<div className="calendar-position">
								<DndProvider backend={HTML5Backend}>
									<Basic
										gym_id={this.props.match.params.id}
									/>
								</DndProvider>
							</div>
						</div>
					)}
				</div>
				<div className="container">
					<div id="target"></div>
				</div>
				<div id="pls" />
			</>
		);
	}
}

export default GymProfile;
