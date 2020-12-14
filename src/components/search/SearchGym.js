import React, { Component } from "react";
import firebase from "../../firebase";
import { Search, Grid } from "semantic-ui-react";
import _ from "lodash";
import PropTypes from "prop-types";
import GymItem from "../GymItem";
import Loading from "../Loading";
import ReactPaginate from "react-paginate";
// search source page: https://react.semantic-ui.com/modules/search/

const db = firebase.firestore();
const resultRenderer = ({ gymName }) => (
	<div style={{ color: "rgb(117, 117, 117)" }}>{gymName}</div>
);
resultRenderer.propTypes = {
	gymName: PropTypes.string,
	gymDescription: PropTypes.string,
};

export default class SearchGym extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			loading: false,
			results: [],
			value: "",
			data: [],
			offset: 0,
			perPage: 5,
			currentPage: 1,
			price: [0, 90],
		};
		this.handlePageClick = this.handlePageClick.bind(this);
	}

	handlePriceChange = (event, newValue) => {
		this.setState({ price: newValue });
		console.log(this.state.price[0]);
		console.log(this.state.data);
	};

	handleResultSelect = (e, { result }) =>
		this.setState({ value: result.gymName });
	handleSearchChange = (e, { value }) => {
		this.setState({ isLoading: true, value });
		setTimeout(() => {
			if (this.state.value.length < 1)
				return this.setState({
					isLoading: false,
					results: this.state.data,
					value: "",
				});
			const re = new RegExp(_.escapeRegExp(this.state.value), "i");
			const isMatch = (result) => re.test(result.gymName);
			this.setState({
				isLoading: false,
				results: _.filter(this.state.data, isMatch),
			});
		}, 300);
	};

	componentDidMount() {
		db.collection("gyms")
			.orderBy("gymName")
			.get()
			.then((snapshot) => {
				const links = snapshot.docs.map((doc) => {
					return { docId: doc.id, ...doc.data() };
				});
				this.setState({ loading: true });
				this.setState({ data: links, results: links });
				this.receivedData();
				this.gymData = links;
				// console.log("links: " + links);
				// console.log("links data: " + this.gymData);
			});
	}

	receivedData() {
		const slice = this.state.results.slice(
			this.state.offset,
			this.state.offset + this.state.perPage
		);
		const postData = slice.map((gym, index) => (
			<GymItem key={gym.id} showCount={false} gym={gym} index={index} />
		));
		this.setState({
			pageCount: Math.ceil(
				this.state.results.length / this.state.perPage
			),
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
				window.scrollTo(0, 0);
			}
		);
	};

	render() {
		const { isLoading, value, results } = this.state;
		return (
			<>
				<Grid>
					<Grid.Column width={17}>
						<Search
							autoFocus
							fluid
							placeholder="Wprowadź nazwę"
							loading={isLoading}
							onResultSelect={this.handleResultSelect}
							onSearchChange={_.debounce(
								this.handleSearchChange,
								500,
								{
									leading: true,
								}
							)}
							results={results}
							value={value}
							resultRenderer={resultRenderer}
							{...this.props}
						/>
						<div className="gyms-load">
							{this.state.loading ? null : <Loading />}
						</div>
						{this.state.results
							.slice(
								this.state.offset,
								this.state.offset + this.state.perPage
							)
							.map((gym, index) => (
								<GymItem
									key={gym.id}
									showCount={false}
									gym={gym}
									index={index}
								/>
							))}
						<div className="pagination-out">
							{this.state.loading ? (
								<ReactPaginate
									previousLabel={"<"}
									nextLabel={">"}
									breakLabel={"..."}
									breakClassName={"break-me"}
									pageCount={this.state.pageCount}
									marginPagesDisplayed={1}
									pageRangeDisplayed={0}
									onPageChange={this.handlePageClick}
									containerClassName={"pagination"}
									subContainerClassName={"pages pagination"}
									activeClassName={"active"}
								/>
							) : null}
						</div>
					</Grid.Column>
				</Grid>
			</>
		);
	}
}
