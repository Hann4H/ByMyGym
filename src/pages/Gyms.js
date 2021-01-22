import React, { Component } from "react";
import firebase from "firebase";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import SearchGym from "../components/search/SearchGym";
import SearchCSS from "../components/search/SearchCSS";

import Filters from "../components/filters/Filters";

class Gyms extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Gyms: [],
			offset: 0,
			perPage: 8,
			currentPage: 1,
			loading: false,
			openFilter: false
		};
		this.handlePageClick = this.handlePageClick.bind(this);
		this.handleClickFilterButton = this.handleClickFilterButton.bind(this);
	}

	componentDidMount() {
		firebase
			.firestore()
			.collection("gyms")
			.get()
			.then((querySnapshot) => {
				const Gyms = [];
				this.setState({ loading: true });
				querySnapshot.forEach(function (doc) {
					Gyms.push({
						gymName: doc.data().gymName,
						gymStreet: doc.data().gymStreet,
						gymCity: doc.data().gymCity,
						gymZip: doc.data().gymZip,
						gymURL: doc.data().gymURL,
						gymPhone: doc.data().gymPhone,
						gymEmail: doc.data().gymEmail,
						gymPhoto: doc.data().gymPhoto,
						gymDescription: doc.data().gymDescription,
						gymLat: doc.data().gymLat,
						gymLng: doc.data().gymLng,
						gymHeight: doc.data().gymHeight,
						gymWidth: doc.data().gymWidth,
						gymLength: doc.data().gymLength,
						gymPrice: doc.data().gymPrice,
						id: doc.data().id,
						docId: doc.id,
					});
				});
				this.setState({ Gyms });
				this.receivedData();
				this.setState({ loading: true });
			})
			.catch(function (error) {
				console.log("Error getting documents: ", error);
			});
	}

	receivedData() {
		const slice = this.state.Gyms.slice(
			this.state.offset,
			this.state.offset + this.state.perPage
		);
		const postData = slice.map((pd) => (
			<React.Fragment>
				<div className="flex-row-item">
					<div className="pic-fa">
						{pd.gymPhoto ? (
							<img
								className="small-pic-ac"
								src={pd.gymPhoto}
								alt="gym"
							/>
						) : (
							<img
								className="small-pic"
								src={require("../img/no_image.svg.png")}
								alt="nothing"
							/>
						)}
						<Link
							to={{
								pathname: `/gym_profile/${pd.docId}`,
							}}
						>
							<FaSearch className="gym-fa" />
						</Link>
					</div>
					<p className="gym-p">{pd.gymName}</p>
				</div>
			</React.Fragment>
		));

		this.setState({
			pageCount: Math.ceil(this.state.Gyms.length / this.state.perPage),
			postData,
		});
	}

	handlePageClick = (e) => {
		const selectedPage = e.selected;
		const offset = selectedPage * this.state.perPage;
		this.setState(
			{
				currentPage: selectedPage,
				offset: offset,
			},
			() => {
				this.receivedData();
			}
		);
	};

	handleClickFilterButton() {
		this.setState({ openFilter: !this.state.openFilter });
	}

	render() {
		return (
			<div>
				<div id="pls" />
				<div className="listing-container">
					<h1>wyszukaj salę</h1>
					<hr />
					<div id="search-bar-filters">
					<button
						className="filter-button"
						style={{ marginLeft: "10%" }}
						type="button"
						onClick={this.handleClickFilterButton}
					>
						FILTRY
					</button>
					<Link to="/map">
					<button
						className="filter-button"
						type="button"
					>
						MAPA
					</button>
					</Link>
					{this.state.openFilter ? (
						<Filters />
					) : (
						<SearchCSS>
							<SearchGym />
						</SearchCSS>
					)}
					
					</div>
					
				</div>
				<div id="pls" />
			</div>
		)
	}
}
export default Gyms;
