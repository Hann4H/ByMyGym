import React, { Component } from "react";
import { Link } from "react-router-dom";
import "firebase/firestore";
import "firebase/storage";
import firebase from "../firebase";

const db = firebase.firestore();

class GymItem extends Component {
	render() {
		const docId = this.props.gym.docId;

		function DeleteItemFromFirebase(e) {
			e.preventDefault();
			console.log("delete function run");
			db.collection("gyms")
				.doc(docId)
				.delete()
				.then(function () {
					console.log("Document successfully deleted! Doc: " + docId);
				})
				.catch(function (error) {
					console.error("Error removing document: ", error);
				});
		}

		return (
			<div>
				<div key={this.props.index} className="single-listing">
					<div className="listing-content">
						<div className="place-for-img">
							{this.props.gym.gymPhoto ? (
								<img
									id="myimg"
									src={this.props.gym.gymPhoto}
									alt="gym"
								/>
							) : (
								<div className="place-for-img">
									<img
										id="myimg_none"
										src={require("../img/no_image.svg.png")}
										alt="nothing"
									/>
								</div>
							)}
						</div>
						<div className="gym-short-info">
							<h3 className="listing-header">
								{this.props.gym.gymName}
							</h3>
							<p>
								Adres: {this.props.gym.gymStreet},{" "}
								{this.props.gym.gymCity} {this.props.gym.gymZip}
							</p>
							<p>
								Wymiary: {this.props.gym.gymLength}m x{" "}
								{this.props.gym.gymWidth}m x{" "}
								{this.props.gym.gymHeight}m
							</p>
							<p>Cena za godzinę: {this.props.gym.gymPrice}zł</p>

							<div className="button-flex">
								<Link
									to={{
										pathname: `/gym_profile/${this.props.gym.docId}`,
									}}
								>
									<button className="gym-short-button">
										więcej informacji
									</button>
								</Link>
								{localStorage.getItem("user") ==
								process.env.REACT_APP_ADMIN_ID ? (
									<button
										onClick={DeleteItemFromFirebase}
										className="delete-gym-button"
									>
										Usuń
									</button>
								) : (
									""
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default GymItem;
