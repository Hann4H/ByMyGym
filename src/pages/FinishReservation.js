import React, { Component } from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';


class FinishReservation extends Component {
    constructor(props){
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    goBack(){
        this.props.history.goBack();
    }

    render(){
        return (
            <><Hero>
                <Banner title='Rezerwacja została zarejestrowana'>
                    <button onClick={() => this.goBack()} className="go-back-btn">
                        wróć
                    </button>
                </Banner>
            </Hero>
            <br />
            <div id="pls"></div></>
        )
    }
}

export default withRouter(FinishReservation); 