import React, { useEffect } from 'react';


const JsonData = () => {

    useEffect( () => {
        getHalls();
    }, []);

    const getHalls = async () => {
        const response = await fetch(`https://www.poznan.pl/mim/plan/map_service.html?mtype=pub_transport&co=class_objects&class_id=331&lang=pl&fbclid=IwAR2NxBA6WgC3kymw6uG8ZTfHPvOkAOfhn-d54FNCATm2yWt79JDTgJaKIq0`);
        const data = await response.json();
        console.log(data);
    }

    return (
        <div></div>
    )

};

export default JsonData;