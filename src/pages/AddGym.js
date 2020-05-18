import React, { Component } from "react";
import Hero from "../components/Hero";
import { useForm } from "react-hook-form";
import Form from "../components/gymForm";
import Banner from "../components/Banner";
import Title from "../components/Title";


class AddGym extends Component {
    render(){
        return <>
        <div id="pls"></div>
        <Hero hero="gymsHero">
            <Banner title="DODAJ SALĘ" banner="gymsBanner">
                <div id="bar"></div>
            </Banner>
        </Hero>
        <Title title="wypełnij dane"></Title>
        <Form></Form>
        </>;

    }
}

export default AddGym;
