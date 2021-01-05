import React, { Component } from "react";
import JsonData from "../components/adminTools/JsonData";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import FilterGyms from "../components/filters/FilterGyms";

class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showComponent: false,
		};
		this._onButtonClick = this._onButtonClick.bind(this);
	}

	_onButtonClick() {
		this.setState({
			showComponent: true,
		});
	}

	render() {
		if (localStorage.getItem("user") != "ZlVPgW1qH0X65ASXIUZoFXab2SI3") {
			return <Redirect to="/noaccess" />;
		}

		return (
			<div>
				<div id="pls"></div>
				<div className="admin-page">
					<div style={{ border: "2px solid var(--darkOrange)" }}>
						<table style={{ width: "100%", margin: "10px" }}>
							<tbody>
								<tr>
									<td>Dodaj sale do firebase z API</td>
									<td>
										<button onClick={this._onButtonClick} style={{ color: "white" }}>
											Dodaj
										</button>
										{this.state.showComponent ? (
											<JsonData />
										) : null}
									</td>
								</tr>
								<tr>
									<td>Zarządzaj rezerwacjami</td>
									<td>
										<Link
											to="/booking"
											style={{ color: "white" }}
										>
											<button>Przejdź</button>
										</Link>
									</td>
								</tr>
								<tr>
									<td>Akceptuj nowe sale</td>
									<td>
										<Link
											to="/newgyms"
											style={{ color: "white" }}
										>
											<button>Przejdź</button>
										</Link>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					{/* TODO delete it */}
					{/* <div style={{ background: "#e6e6e6" }}>
						<br />
						<FilterGyms />
					</div> */}
				</div>
			</div>
		);
	}
}

export default Admin;
