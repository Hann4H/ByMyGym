import React, { Component } from "react";
import SimpleImageSlider from "react-simple-image-slider";

// const GLOBAL_MEDIA_QUERIES = {
//   small: "(max-width: 599px)",
//   medium: "(min-width: 600px) and (max-width: 1199px)",
//   large: "(min-width: 1200px)",
// };

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
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
          width={this.state.width - 400}
          height={504}
          images={images}
        />
      </div>
    );
  }
}

export default Slider;
