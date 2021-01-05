import React, { Component, useState }  from 'react'
import { Link } from "react-router-dom";
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from "react-google-maps"
import * as hallsData from "../halls.json"
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from "use-places-autocomplete"
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
    ComboboxOptionText,
  } from "@reach/combobox";
import "@reach/combobox/styles.css";


function Map() {
    const [selectedHall, setSelectedHall] = useState(null);
    

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
    }, []);
    
    const pan = React.useCallback(({ lat, lng }) => {
        mapRef.current.pan({ lat, lng });
        mapRef.current.setZoom(14);
      }, []);
    return(
            <div>
            
            <Search pan={pan} />
            <Locate pan={pan}/>
             <GoogleMap 
                id="map"
                defaultZoom={12} 
                defaultCenter={{lat:52.406376, lng: 16.925167}}
                onLoad={onMapLoad}
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
                        <Link to="/contact"/>
                        <button type="button">
                            lol
                        </button>
                    </div>
                </InfoWindow>
            )}

            </GoogleMap>
            </div>
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

function Locate({pan}) {
    return <button className="locate" onClick= {() => {
        navigator.geolocation.getCurrentPosition((position)=> {
            console.log(position)
            pan({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            })
        }, () => null);
    }}>
                Locate
        </button>
}

function Search({pan}) {
    const{ 
        ready,
         value,
          suggestions: {status, data}, 
          setValue, 
          clearSuggestions} = usePlacesAutocomplete({
        requestOptions: {
            location: {lat: () => 52.406376, lng: () => 16.925167},
            radius: 200*1000,
        }
    })

    const handleInput = (e) => {
        setValue(e.target.value);
      };
    
    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

    try {
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        pan({ lat, lng });
    } catch (error) {
      console.log(" Error: ", error);
    }
  };


    return (
    <div className="SearchMapBox">
    <Combobox onSelect={handleSelect}>
            <ComboboxInput value={value} 
            onChange={handleInput}
            disable={!ready}
            placeholder="Enter your address"
            />
            <ComboboxPopover>
                <ComboboxList>
                {status === "OK" && data.map(({id,description}) => (
                <ComboboxOption key={id} value={description}/>))}
                </ComboboxList>
            </ComboboxPopover>
            </Combobox> 
        </div>        
    )
}


export default MapSearch