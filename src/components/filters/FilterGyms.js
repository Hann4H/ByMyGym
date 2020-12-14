import React, { Component } from "react";
import Filters from "./Filters";

class FilterGyms extends Component {
	constructor(props) {
		super(props);
		this.state = { data: [], openFilter: false };
		this.handleClickFilterButton = this.handleClickFilterButton.bind(this);
	}

	handleClickFilterButton() {
		this.setState({ openFilter: !this.state.openFilter });
	}

	render() {
		return (
			<>
				<button type="button" className="filter-button" onClick={this.handleClickFilterButton}>
					Filtry
				</button>
				{this.state.openFilter ? <Filters /> : <p />}
			</>
		);
	}
}

export default FilterGyms;
