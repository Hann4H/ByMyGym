import React, { Component } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import firebase from "firebase";

const db = firebase.firestore();

class Slider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: 0,
			height: 0,
			data: [],
			// photoArray: [{ url: require("../img/logo2.png") }],
			photoArray: [],
		};
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	checkValidUrl = (url) => {
		//define some image formats 
		var types = ['png'];
		
		//split the url into parts that has dots before them
		var parts = url.split('.');
		
		//get the last part 
		var extension = parts[parts.length-1];
		
		//check if the extension matches list 
		if(types.indexOf(extension) !== -1) {
			return true;   
		}
	}

	async componentDidMount(props) {
		this.updateWindowDimensions();
		window.addEventListener("resize", this.updateWindowDimensions);

		try {
			const cityRef = db.collection("gyms").doc(this.props.dataId);
			const doc = await cityRef.get();
			if (!doc.exists) {
				console.log("No such document!");
			} else {
				// console.log("Document data:", doc.data());
				this.setState({ data: doc.data() });

				let myArray = doc.data().gymPhoto;
				// console.log(myArray)
				// let photoArray = [{ url: require("../img/logo2.png") }];
				let photoArray = [];
				// if (myArray !== undefined || myArray.length !== 0) {
					myArray.forEach((entry) => {
						if (entry.includes('.jpg')) {
							console.log("YES")
							let myObject = {};
							myObject.url = entry;
							photoArray.push(myObject);
							// let myObject = {};
							// myObject.url = entry;
							console.log(myObject)
							// photoArray.push(entry);
							// console.log(photoArray)
						} else {
							let myObject = {};
							myObject.url = entry;
							photoArray.push(myObject);
						}					
					});
				// }
				this.setState({ photoArray: photoArray });
			}
		} catch (error) {
			console.log("Wystapił błąd");
			console.log(error);
		}
	}

	// async componentDidMount(props) {
	//   this.updateWindowDimensions();
	//   window.addEventListener("resize", this.updateWindowDimensions);

	//   try {
	//     const cityRef = db.collection("gyms").doc(this.props.dataId);
	//     const doc = await cityRef.get();
	//     if (!doc.exists) {
	//       console.log("No such document!");
	//     } else {
	//       console.log("Document data:", doc.data());
	//       this.setState({ data: doc.data() });
	//     }
	//   } catch (error) {
	//     console.log("Wystapił błąd");
	//     console.log(error);
	//   }
	// }

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}

	render() {
		// const images = [
		//   { url: require("../img/gym_2.png") },
		//   { url: require("../img/header_img.png") },
		// ];

		// console.log("photoArray: ", this.state.photoArray);
		return (
			<>
			<div className="slider-comp">
				{this.state.photoArray.length ? (
					<SimpleImageSlider
						width={"70vw"}
						height={504}
						images={this.state.photoArray}
					/>
				) : (
					""
				)}
			</div>
			<div className="slider-mob">
				{this.state.photoArray.length ? (
					<SimpleImageSlider
						width={"90vw"}
						height={200}
						images={this.state.photoArray}
					/>
				) : (
					""
				)}
			</div>
			</>
		);
	}
}

export default Slider;
