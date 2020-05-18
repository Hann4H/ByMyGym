import React, { Component } from "react";
import { useForm } from "react-hook-form";


export default function gymForm() {
    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (data) => {
            console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Nazwa budynku</label>
                <input type="text" name="gymName" ref={register} required/>
            </div>
            <div>
                <label>Ulica</label>
                <input type="text" name="street" ref={register} required/>
            </div>
            <div>
                <label>Miasto</label>
                <input type="text" name="city" ref={register} required/>
            </div>
            <div>
                <label>Kod pocztowy</label>
                <input type="text" name="zip" ref={register} required/>
            </div>
            <div>
                <label>Wysokość</label>
                <input type="number" name="height" min="1" ref={register} required/>
            </div>
            <div>
                <label>Szerokość</label>
                <input type="number" name="width" min="1" ref={register} required/>
            </div>
            <div>
                <label>Długość</label>
                <input type="number" name="length" min="1" ref={register} required/>
            </div>
            <div>
                <label>Ilość miejsc na widowni</label>
                <input type="number" name="audience" min="0" ref={register}/>
            </div>
            <div>
                <label>Ilość szatń</label>
                <input type="number" name="changingRooms" min="0" ref={register} required/>
            </div>
            <div>
                <label>Cena za godzinę</label>
                <input type="number" name="price" min="1" ref={register} required/>
            </div><br />
            <button>Dodaj</button>
        </form>
    )
}