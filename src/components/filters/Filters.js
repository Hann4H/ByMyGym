import React, { Component } from "react";
import GymItem from "../GymItem";
import firebase from "../../firebase";
import FilteredItems from "./FilteredItems";
import Loading from "../Loading";
import ReactPaginate from "react-paginate";
const db = firebase.firestore();

const nameStyle = {
	fontWeight: "bold",
	color: "var(--darkOrange)",
	textTransform: "none",
};

const textStyle = {
	color: "#808080",
	width: "auto",
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
			gymPriceFrom: "",
			gymDate: "",
			gymTimeFrom: "",
			gymTimeTo: "",
			gymPriceTo: "",
			gymHeightM: "",
			gymWidthM: "",
			gymLengthM: "",
			audienceN: "",
			changingRoomsN: "",

			loading: false,



			offset: 0,
			perPage: 5,
			currentPage: 1,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);


		this.handlePageClick = this.handlePageClick.bind(this);
		this.receivedData = this.receivedData.bind(this);
	}

	componentDidMount() {
		db.collection("gyms")
			// .orderBy("gymPrice")
			.orderBy("gymName")
			.where("accepted", "==", true)
			// .where("gymPrice", ">=", this.state.gymPriceFrom)
			// .where("gymPrice", "<=", this.state.gymPriceTo)
			.get()
			.then((snapshot) => {
				const links = snapshot.docs.map((doc) => {
					return { docId: doc.id, ...doc.data() };
				});
				this.setState({ data: links });
				this.receivedData();
				this.gymData = links;
				this.setState({ loading: true });
			});
	}

	handleChange = (event) => {
		event.persist();
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();

		let flt = db.collection("gyms");
		let reservations = db.collection("reservation");

		let reservedGymsId = [];

		if (this.state.gymDate !== "" && 
		this.state.gymTimeFrom !== "" &&
		this.state.gymTimeTo !== "") {
			const timeFrom = Date.parse(this.state.gymDate + " " + this.state.gymTimeFrom);
			const timeTo = Date.parse(this.state.gymDate + " " + this.state.gymTimeTo);
			console.log(timeFrom, timeTo);

			reservations.get().then((snapshot) => {
				snapshot.docs.map((doc) => {
					const sTime = Date.parse(doc.data().start);
					const eTime = Date.parse(doc.data().end);

					if ((sTime >= timeFrom && sTime <= timeTo) || 
						(eTime >= timeFrom && eTime <= timeTo)) {
							console.log(doc.data())
							reservedGymsId.push(doc.data().gym_id);
						}

				});
			});

		}

		if (this.state.gymPriceFrom != "" || this.state.gymPriceTo != "") {
			flt = flt.orderBy("gymPrice");
			if (this.state.gymPriceFrom != "") {
				flt = flt.where(
					"gymPrice",
					">=",
					Number(this.state.gymPriceFrom)
				);
			}
			if (this.state.gymPriceTo != "") {
				flt = flt.where(
					"gymPrice",
					"<=",
					Number(this.state.gymPriceTo)
				);
			}
		}

		if (this.state.gymHeightM != "") {
			flt = flt.where("gymHeight", "==", Number(this.state.gymHeightM));
		}

		if (this.state.gymWidthM != "") {
			flt = flt.where("gymWidth", "==", Number(this.state.gymWidthM));
		}

		if (this.state.gymLengthM != "") {
			flt = flt.where("gymLength", "==", Number(this.state.gymLengthM));
		}

		if (this.state.audienceN != "") {
			flt = flt.where("audience", "==", Number(this.state.audienceN));
		}

		if (this.state.changingRoomsN != "") {
			flt = flt.where(
				"changingRooms",
				"==",
				Number(this.state.changingRoomsN)
			);
		}

		flt.get().then((snapshot) => {
			const links = snapshot.docs.map((doc) => {
				if (!reservedGymsId.includes(doc.id)) {
					return { docId: doc.id, ...doc.data() };
				} else return null;
			});
			this.setState({ data: links });
			this.receivedData();
			this.gymData = links;
		});
	};


	////////////////

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
				window.scrollTo(0, 0);
			}
		);
	};

	receivedData() {
		const slice = this.state.data.slice(
			this.state.offset,
			this.state.offset + this.state.perPage
		);
		const postData = slice.map((gym, index) => (
			<GymItem key={gym.id} showCount={false} gym={gym} index={index} />
		));
		this.setState({
			pageCount: Math.ceil(this.state.data.length / this.state.perPage),
			postData,
		});
	}

	part() {
		return (
			<>
				{this.state.data
					.slice(
						this.state.offset,
						this.state.offset + this.state.perPage
					)
					.map((gym, index) => {
						if (gym !== null) { return (
						<GymItem
							key={gym.id}
							showCount={false}
							gym={gym}
							index={index}
						/>
					) } else return (null) })}
				<div className="pagination-out">
				{this.state.loading ? (
					<ReactPaginate
						previousLabel={"<"}
						nextLabel={">"}
						breakLabel={"..."}
						breakClassName={"break-me"}
						pageCount={this.state.pageCount}
						marginPagesDisplayed={2}
						pageRangeDisplayed={0}
						onPageChange={this.handlePageClick}
						containerClassName={"pagination"}
						subContainerClassName={"pages pagination"}
						activeClassName={"active"}
					/>
				) : null }
				</div>
			</>
		);
	}

	render() {
		// console.log(this.state.data);
		return (
			<>
				<div style={containerStyle} className="filters">
					<br />
					<form onSubmit={this.handleSubmit}>
						<div style={{ display: "inline-block" }}>
							<label style={nameStyle}>
								Cena (zł):{" "}
								<label style={textStyle} className="text-style-mob">
									od
									<input
										className="text-style-mob"
										style={textStyle}
										label="Od"
										placeholder="od"
										type="number"
										name="gymPriceFrom"
										onChange={this.handleChange}
										value={this.state.gymPriceFrom}
									/>
								</label>
								<label style={textStyle} className="text-style-mob">
									do
									<input
										className="text-style-mob"
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
								Data:{" "}
								<label style={textStyle} className="text-style-mob">
									<input
										className="text-style-mob"
										style={textStyle}
										type="date"
										name="gymDate"
										onChange={this.handleChange}
										value={this.state.gymDate}
									/>
								</label>	
							</label>
						</div>	

						<div>
							<label style={nameStyle}>
								Czas:{" "}
								<label style={textStyle} className="text-style-mob">
									od
									<input
										className="text-style-mob"
										style={textStyle}
										label="Od"
										type="time"
										name="gymTimeFrom"
										onChange={this.handleChange}
										value={this.state.gymTimeFrom}
									/>
								</label>
								<label style={textStyle} className="text-style-mob">
									do
									<input
										className="text-style-mob"
										style={textStyle}
										label="Do"
										type="time"
										name="gymTimeTo"
										onChange={this.handleChange}
										value={this.state.gymTimeTo}
									/>
								</label>
							</label>
						</div>

						<div>
							<label style={nameStyle}>
								Długość (m):{" "}
								<input
									className="text-style-mob"
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
									className="text-style-mob"
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
									className="text-style-mob"
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
									className="text-style-mob"
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
									className="text-style-mob"
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
						<button type="submit" className="filter-button">
							Zastosuj
						</button>
						<p></p>
						<br />
					</form>
				</div>
				<div>
					<div className="gyms-load">
						{this.state.loading ? null : <Loading />}
					</div>
					{this.part()}
					{/* <FilteredItems data={this.state.data} /> */}
					{/* {this.state.data.map((gym, index) => (
						<GymItem
							key={gym.id}
							showCount={false}
							gym={gym}
							index={index}
						/>
					))} */}
				</div>
			</>
		)
	}
}

export default Filters;
