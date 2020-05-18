import React, { Component } from "react";
import Hero from "./Hero";
import { useForm } from "react-hook-form";
import Form from "./gymForm";
import Banner from "./Banner";


class AddGym extends Component {
    render(){
        return <>
        <div id="pls"></div>
        <Hero hero="gymsHero">
            <Banner title="DODAJ SALĘ" banner="gymsBanner">
                <div id="bar"></div>
            </Banner>
        </Hero>
        <Form></Form>
        </>;

    }
}

export default AddGym;
