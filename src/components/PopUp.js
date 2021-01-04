import React, { Component } from "react";
import StarRatings from "../components/StarRatings";

export default class PopUp extends Component {

    handleClick = () => {
        this.props.toggle();
    };

    render() {
        return (
            <div className="modal">
                <div className="modal_content">
                    <span className="close" onClick={this.handleClick}>&times;    </span>
                    <p>Całokształt: </p>
                    <StarRatings gymID={this.props.gymId} bookingID={this.props.bookingID}/>
                </div>
            </div>
        );
    }
  }