import React, { Component } from "react";
import Hero from "./Hero";
import { useForm } from "react-hook-form";
import Form from "./gymForm";


class AddGym extends Component {
    render(){
        return <>
        <Hero></Hero>
        <Form></Form>
        </>;

    }
}

export default AddGym;
