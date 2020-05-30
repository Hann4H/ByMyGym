import React, { useEffect, useState, Component } from 'react';


const JsonData = () => {

    const initialState = {};

    const [halls, setHalls] = useState([]);

    const names = []; 

    useEffect( () => {
        getHalls();
    }, []);

    const getHalls = async () => {
        const response = await fetch(`https://www.poznan.pl/mim/plan/map_service.html?mtype=pub_transport&co=class_objects&class_id=331&lang=pl&fbclid=IwAR2NxBA6WgC3kymw6uG8ZTfHPvOkAOfhn-d54FNCATm2yWt79JDTgJaKIq0`);
        const data = await response.json();
        const halls = data.features;
        console.log(halls[0].properties.nazwa);
        

    }




        return (

            <div>
                {
                halls.map(function(hall, i) {
                    console.log('test')
                    return <li key={i}>{hall}</li>
                })
                }
            </div>
        )
   
}

export default JsonData;