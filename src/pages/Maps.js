import React, { useState }  from 'react'
import { Link } from "react-router-dom";
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

const libraries = ["places"];
const mapContainerStyle = {
  height: "90vh",
  width: "95vw",
  marginLeft: "30px"
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

        
    <div id="slash"></div>
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
                  <button className="btn-goTo"><Link to={"/gym_profile/" + selectedHall.properties.url2}>Do strony</Link></button>
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
