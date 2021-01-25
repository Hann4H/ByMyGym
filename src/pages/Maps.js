import React, { useState, useEffect }  from 'react'
import { Link } from "react-router-dom";

import firebase from "firebase";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import * as hallsData from "../halls.json"
import "@reach/combobox/styles.css";
import Gyms from './Gyms';

const libraries = ["places"];
const mapContainerStyle = {
  height: "90vh",
  width: "100vw"
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
    lat:52.406376,
    lng: 16.925167
};

export default function Maps() {
  const [Gyms, setGyms] = useState([])
  
  useEffect(() => {
    firebase
			.firestore()
			.collection("gyms")
			.get()
			.then((querySnapshot) => {
				const Gyms = [];
				querySnapshot.forEach(function (doc) {
					Gyms.push({
						gymName: doc.data().gymName,
						gymStreet: doc.data().gymStreet,
						gymCity: doc.data().gymCity,
						gymZip: doc.data().gymZip,
						gymURL: doc.data().gymURL,
						gymPhone: doc.data().gymPhone,
						gymEmail: doc.data().gymEmail,
						gymPhoto: doc.data().gymPhoto,
						gymDescription: doc.data().gymDescription,
						gymLat: doc.data().gymLat,
						gymLng: doc.data().gymLng,
						gymHeight: doc.data().gymHeight,
						gymWidth: doc.data().gymWidth,
						gymLength: doc.data().gymLength,
						gymPrice: doc.data().gymPrice,
						id: doc.data().id,
						docId: doc.id,
					});
				});
				setGyms({ Gyms });
        // this.setState({ loading: true });
			})
			.catch(function (error) {
				console.log("Error getting documents: ", error);
			});
  }, []);
  
  console.log("This is Gyms")
  console.log(Gyms)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBx1SVzcsi1P1QW4au9tonV12_UzCiu7rk',
    libraries,
  });
  const [selectedHall, setSelectedHall] = useState(null);


  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Ładowanie...";

  

  return (
    <div>
 
      <Locate panTo={panTo} />
      <Search panTo={panTo} /> 
      
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onLoad={onMapLoad}
      > 

      {console.log(Gyms)}
       {Gyms.Gyms && Gyms.Gyms.map((gym) => (
          <Marker key={gym.id}
          position={{
              lat: gym.gymLat,
              lng: gym.gymLng
          }}
          onClick={() => {
            setSelectedHall(gym)
          }}
          />
      ))}

      {selectedHall && (
          <InfoWindow 
          position={{
              lat: selectedHall.gymLat,
              lng: selectedHall.gymLng
          }}
          onCloseClick={() => {
              setSelectedHall(null);
      }}
          >
              <div>
                  <h3>{selectedHall.gymName}</h3>
                  <p>{selectedHall.gymStreet}</p>
                  <p>{selectedHall.gymPhone}</p>
                  <p>{selectedHall.gymURL}</p>
                  <button className="btn-goTo"><Link to={"/gym_profile/" + selectedHall.docId}>Do strony</Link></button>
              </div>
          </InfoWindow>
      )}
      </GoogleMap> 
      <div id="pls"></div>
    </div>
  );
}

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >Znajdź
    </button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log(" Error: ", error);
    }
  };
  return (
    <div className="SearchMapBox">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Wpisz swoją lokalizację"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
