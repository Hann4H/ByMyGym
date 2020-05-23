import React, { Component, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import firebase from "../firebase"


export default function gymForm() {
    const {register, handleSubmit, errors} = useForm();

    function onSubmit(e) {

        firebase.firestore().collection('gyms').add({
            gymName,
            street,
            city,
            zip, 
            height,
            width,
            length, 
            audience,
            changingRooms, 
            price
        })
        .then(() => {
            setGymName('')
        })
    }

    const [gymName, setGymName] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [zip, setZip] = useState('')
    const [height, setHeight] = useState('')
    const [width, setWidth] = useState('')
    const [length, setLength] = useState('')
    const [audience, setAudience] = useState('')
    const [changingRooms, setChangingRooms] = useState('')
    const [price, setPrice] = useState('')

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="gymForm">
            <div className="container-2">
                <label>Nazwa budynku</label>
                <input type="text" value = {gymName} name="gymName" onChange={e => setGymName(e.currentTarget.value)} ref={register} required/>
            </div>
            <div className="container-2">
                <label>Ulica</label>
                <input type="text" value = {street} name="street" onChange={e => setStreet(e.currentTarget.value)} ref={register} required/>
            </div>
            <div className="container-2">
                <label>Miasto</label>
                <input type="text" value ={city} name="city" onChange={e => setCity(e.currentTarget.value)} ref={register} required/>
            </div>
            <div className="container-2">
                <label>Kod pocztowy</label>
                <input type="text" value ={zip} name="zip" onChange={e => setZip(e.currentTarget.value)} ref={register} required/>
            </div>
            <div className="container-2">
                <label>Wysokość</label>
                <input type="text" value ={height} name="height" onChange={e => setHeight(e.currentTarget.value)} min="1" ref={register} required/>
            </div>
            <div className="container-2">
                <label>Szerokość</label>
                <input type="text" value ={width} name="width" onChange={e => setWidth(e.currentTarget.value)} min="1" ref={register} required/>
            </div>
            <div className="container-2">
                <label>Długość</label>
                <input type="text" value ={length} name="length" onChange={e => setLength(e.currentTarget.value)} min="1" ref={register} required/>
            </div>
            <div className="container-2">
                <label>Ilość miejsc na widowni</label>
                <input type="text" value ={audience} name="audience" onChange={e => setAudience(e.currentTarget.value)} min="0" ref={register}/>
            </div>
            <div className="container-2">
                <label>Ilość szatń</label>
                <input type="text" value ={changingRooms} name="changingRooms" onChange={e => setChangingRooms(e.currentTarget.value)} min="0" ref={register} required/>
            </div>
            <div className="container-2">
                <label>Cena za godzinę</label>
                <input type="text" value ={price} name="price" onChange={e => setPrice(e.currentTarget.value)} min="1" ref={register} required/>
            </div>
            <div></div><div></div>
            <button>DODAJ</button>
            
        </form>
    )
}