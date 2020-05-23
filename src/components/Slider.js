import React, { Component } from 'react';
import SimpleImageSlider from "react-simple-image-slider";

class Slider extends Component {
    render() {
        const images = [
            { url: require("../img/gym_2.png") },
            { url: require("../img/header_img.png") },
        ];

        return (
            <div>
                <SimpleImageSlider
                    width={600}
                    height={300}
                    images={images}
                />
            </div>
        );
    }
}

export default Slider;
