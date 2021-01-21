// https://stackoverflow.com/questions/53168692/esri-leaflet-geosearch-how-to-integrate-it-with-react/53173755
// https://github.com/Esri/esri-leaflet-geocoder
// https://leafletjs.com/examples/zoom-levels/
import React, { Component, createRef } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import * as ELG from "esri-leaflet-geocoder";

// import marker icons
// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
// 	iconRetinaUrl:
// 		"https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png",
// 	iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
// 	shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
// });

class Localization extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// gymLat: 52.406376,
			// gymLng: 16.925167,
			// zoom: 15,
		};
	}

	componentDidMount() {
		const map = this.leafletMap.leafletElement;
		// const searchControl = new ELG.Geosearch().addTo(map);
		const results = new L.LayerGroup().addTo(map);

		// searchControl.on("results", function (data) {
		// 	console.log("geodata: ", data);
		// 	results.clearLayers();
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
					// console.log("results:", resultsData);
					// console.log("results:", resultsData.results[0].latlng);
					results.addLayer(L.marker(resultsData.results[0].latlng));
					// map.setZoom(15);
				}
			});
	}

	render() {
		const position = this.props.position;
		// const gymName = this.props.gymName;
		// const center = [37.7833, -122.4167];
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

	// state = {
	// 	gymLat: 52.406376,
	// 	gymLng: 16.925167,
	// 	zoom: 15,
	// };

	// render() {
	// 	const position = this.props.position;
	// 	const gymName = this.props.gymName;

	// 	return (
	// 		<Map center={position} zoom={this.state.zoom}>
	// 			<TileLayer
	// 				attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	// 				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
	// 			/>
	// 			<Marker position={position}>
	// 				<Popup>
	// 					{gymName} <br /> ({this.state.gymLat},{" "}
	// 					{this.state.gymLng})
	// 				</Popup>
	// 			</Marker>
	// 		</Map>
	// 	);
	// }
}

export default Localization;
