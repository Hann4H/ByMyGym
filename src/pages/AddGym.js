import React, { Component } from "react";
import Hero from "../components/Hero";
import { useForm } from "react-hook-form";
import Form from "../components/gymForm";
import Banner from "../components/Banner";


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
