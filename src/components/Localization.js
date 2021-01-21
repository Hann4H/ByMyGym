// https://stackoverflow.com/questions/53168692/esri-leaflet-geosearch-how-to-integrate-it-with-react/53173755
// https://github.com/Esri/esri-leaflet-geocoder
// https://leafletjs.com/examples/zoom-levels/
import React, { Component, createRef } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import * as ELG from "esri-leaflet-geocoder";

class Localization extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const map = this.leafletMap.leafletElement;
		// const searchControl = new ELG.Geosearch().addTo(map);
		const results = new L.LayerGroup().addTo(map);

		// searchControl.on("results", function (data) {
		// results.clearLayers();
		// 	for (let i = data.results.length - 1; i >= 0; i--) {
		// 		results.addLayer(L.marker(data.results[i].latlng));
		// 	}
		// });

		console.log("street gymStreetINT:", this.props.gymStreet);

		let searchControl2 = new ELG.Geocode()
			.address(this.props.gymStreet)
			.city(this.props.gymCity)
			.postal(this.props.gymZip)
			.run(function (err, resultsData, response) {
				if (err) {
					console.log(err);
					return;
				}
				if (resultsData.results[0]) {
					results
						.addLayer(L.marker(resultsData.results[0].latlng))
						.addTo(map)
						.bindPopup("Marker 1")
						.on(
							"click",
							map.setView(resultsData.results[0].latlng, 15)
						);
				}
			});
	}

	render() {
		const position = this.props.position;
		// const gymName = this.props.gymName;
		return (
			<Map
				style={{ height: "100vh" }}
				center={position}
				zoom="10"
				ref={(m) => {
					this.leafletMap = m;
				}}
			>
				<TileLayer
					attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
					url={"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
				/>
				<div className="pointer" />
				{/* <Marker position={position}>
					<Popup>
						{gymName} <br />
					</Popup>
				</Marker> */}
			</Map>
		);
	}
}

export default Localization;
