import React, { Component } from "react";
import GymItem from "../GymItem";
import ReactPaginate from "react-paginate";

class FilteredItems extends Component {
	constructor(props) {
		super(props);
		this.state = {
			results: this.props.data,
			offset: 0,
			data: [],
			perPage: 5,
			currentPage: 1,
		};
		this.handlePageClick = this.handlePageClick.bind(this);
		this.receivedData = this.receivedData.bind(this);
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

	receivedData() {
		const slice = this.props.data.slice(
			this.state.offset,
			this.state.offset + this.state.perPage
		);
		const postData = slice.map((gym, index) => (
			<GymItem key={gym.id} showCount={false} gym={gym} index={index} />
		));
		this.setState({
			pageCount: Math.ceil(this.props.data.length / this.state.perPage),
			postData,
		});
	}

	render() {
		return (
			<>
				{this.props.data
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
				</div>
			</>
		);
	}
}

export default FilteredItems;
