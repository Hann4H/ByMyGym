import React, { Component, useState }  from 'react'
import { Link } from "react-router-dom";
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from "react-google-maps"
import * as hallsData from "../halls.json"


function Map() {
    const [selectedHall, setSelectedHall] = useState(null);
        return(
             <GoogleMap 
                defaultZoom={12} 
                defaultCenter={{lat:52.406376, lng: 16.925167}}
            >
            {hallsData.features.map((hall)=> (
                <Marker key={hall.id}
                position={{
                    lat: hall.geometry.coordinates[1],
                    lng: hall.geometry.coordinates[0]
                }}
                onClick={() => {
                    setSelectedHall(hall);
                }}
                />
            ))}

            {selectedHall && (
                <InfoWindow 
                position={{
                    lat: selectedHall.geometry.coordinates[1],
                    lng: selectedHall.geometry.coordinates[0]
                }}
                onCloseClick={() => {
                    setSelectedHall(null);
            }}
                >
                    <div>
                        <h3>{selectedHall.properties.nazwa}</h3>
                        <p>{selectedHall.properties.adres}</p>
                        <p>{selectedHall.properties.telefon}</p>
                        <p>{selectedHall.properties.url}</p>
                    </div>
                </InfoWindow>
            )}

            </GoogleMap>
        )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

function MapSearch() {
    return(
        <>
            
            <div id="slash"></div>
             <div id="pls"></div>
             <div style={{width: '95vw', height: '80vh', margin: '30px'}}>
             <WrappedMap 
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBx1SVzcsi1P1QW4au9tonV12_UzCiu7rk&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: "100%"}}/>}
                containerElement={<div style={{ height: "100%"}}/>}
                mapElement={<div style={{ height: "100%"}}/>}
            />
            </div>
            <div id="pls"></div>
        </>
    )
}

export default MapSearch