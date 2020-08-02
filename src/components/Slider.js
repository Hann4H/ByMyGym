import React, { Component } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import firebase from "firebase"

const db = firebase.firestore();


class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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
        console.log("Document data:", doc.data());
        this.setState({ data: doc.data() });
      }
    } catch (error) {
      console.log("Wystapił błąd");
      console.log(error);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const images = [
      { url: require("../img/gym_2.png") },
      { url: require("../img/header_img.png") },
    ];

    return (
      <div>
        <SimpleImageSlider
          width={"70vw"}
          height={504}
          images={images}
        />
      </div>
    );
  }
}

export default Slider;
