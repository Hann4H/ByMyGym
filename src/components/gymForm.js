import React, { Component, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import firebase from "../firebase";
import "firebase/storage";
import ImageUpload from "./ImageUpload";
import Listing from "./Listing";
import FileUploader from "react-firebase-file-uploader";
import DragAndDrop from "./DragAndDrop";

import InputMask from "react-input-mask";

export default function gymForm() {
  const { register, handleSubmit, errors } = useForm();

  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState("");

  console.log(imageAsFile);
  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  var storage = firebase.storage();
  const db = firebase.firestore();

  const ref = db.collection("gyms").doc();

  function onSubmit(e) {
    db.collection("gyms")
      .add({
        gymName,
        street,
        city,
        zip,
        height,
        width,
        length,
        audience,
        changingRooms,
        price,
        id: ref.id,
      })
      .then(() => {
        setGymName("");
      });

    const key = ref.id;
    const uploadTask = storage.ref(`/${ref.id}/1.png`).put(imageAsFile);

    uploadTask
      .then((uploadTaskSnapshot) => {
        return uploadTaskSnapshot.ref.getDownloadURL();
      })
      .then((url) => {
        setImageAsUrl(url);
        console.log(imageAsUrl);
      });
    /*    (snapShot) => {
            console.log(snapShot)
            console.log(snapShot)
        }, (err) => {
            console.log(err)
        }, () => {
            storage.ref(`${ref.id}`).child(`${imageAsFile.name}`).getDownloadURL().then(url => {
                setImageAsUrl(url)
            })
            console.log(imageAsFile.name)
            console.log(imageAsUrl)
        })*/
  }

  const [gymName, setGymName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [audience, setAudience] = useState("");
  const [changingRooms, setChangingRooms] = useState("");
  const [price, setPrice] = useState("");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="gymForm">
      <div className="container-2">
        <label>Nazwa budynku</label>
        <input
          type="text"
          value={gymName}
          name="gymName"
          onChange={(e) => setGymName(e.currentTarget.value)}
          ref={register}
          required
        />
      </div>
      <div className="container-2">
        <label>Ulica</label>
        <input
          type="text"
          value={street}
          name="street"
          onChange={(e) => setStreet(e.currentTarget.value)}
          ref={register}
          required
        />
      </div>
      <div className="container-2">
        <label>Miasto</label>
        <InputMask
          type="text"
          value={city}
          name="city"
          onChange={(e) => setCity(e.currentTarget.value)}
          ref={register}
          required
        />
      </div>
      <div className="container-2">
        <label>Kod pocztowy</label>
        <InputMask
          type="text"
          value={zip}
          name="zip"
          pattern="^\d{2}-\d{3}$"
          mask="99-999"
          onChange={(e) => setZip(e.currentTarget.value)}
          ref={register}
          required
        />
      </div>
      <div className="container-2">
        <label>Wysokość</label>
        <input
          type="text"
          value={height}
          name="height"
          placeholder="w metrach"
          pattern="[0-9]+([\.,][0-9]+)?"
          onChange={(e) => setHeight(e.currentTarget.value)}
          min="1"
          ref={register}
          required
        />
      </div>
      <div className="container-2">
        <label>Szerokość</label>
        <input
          type="text"
          value={width}
          name="width"
          placeholder="w metrach"
          pattern="[0-9]+([\.,][0-9]+)?"
          onChange={(e) => setWidth(e.currentTarget.value)}
          min="1"
          ref={register}
          required
        />
      </div>
      <div className="container-2">
        <label>Długość</label>
        <input
          type="text"
          value={length}
          name="length"
          placeholder="w metrach"
          pattern="[0-9]+([\.,][0-9]+)?"
          onChange={(e) => setLength(e.currentTarget.value)}
          min="1"
          ref={register}
          required
        />
      </div>
      <div className="container-2">
        <label>Ilość miejsc na widowni</label>
        <input
          type="number"
          value={audience}
          name="audience"
          onChange={(e) => setAudience(e.currentTarget.value)}
          min="0"
          ref={register}
        />
      </div>
      <div className="container-2">
        <label>Ilość szatń</label>
        <input
          type="number"
          value={changingRooms}
          name="changingRooms"
          onChange={(e) => setChangingRooms(e.currentTarget.value)}
          min="0"
          ref={register}
          required
        />
      </div>
      <div className="container-2">
        <label>Cena za godzinę</label>
        <input
          type="text"
          value={price}
          name="price"
          pattern="[0-9]+([\.,][0-9]{0,2})?"
          onChange={(e) => setPrice(e.currentTarget.value)}
          min="1"
          ref={register}
          required
        />
      </div>

      <div id="gallery">
        <DragAndDrop id="img_url" onChange={handleImageAsFile} />
      </div>

      <div className="container-3">
        <label>
          {" "}
          <b>Typ:</b>
        </label>

        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineCheckbox1">
            boisko do piłki nożnej
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox1"
            value="option1"
          />
        </div>

        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineCheckbox2">
            boisko do siatkówki
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox2"
            value="option2"
          />
        </div>

        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineCheckbox3">
            boisko do koszykówki
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox3"
            value="option3"
          />
        </div>
        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineCheckbox4">
            boisko do tenisa ziemnego
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox4"
            value="option4"
          />
        </div>
        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineCheckbox5">
            sala do aerobiku
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox5"
            value="option5"
          />
        </div>
        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineCheckbox6">
            siłownia
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox6"
            value="option6"
          />
        </div>
      </div>
      {/* 2////////////////////////////////////////////// */}
      <br />
      <div className="container-3">
        <label>
          {" "}
          <b>Udogodnienia:</b>
        </label>

        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineCheckbox1">
            toaleta wewnątrz budynku
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox1"
            value="option1"
          />
        </div>

        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineCheckbox2">
            TOJ TOJ na zewnątrz budynku
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox2"
            value="option2"
          />
        </div>
        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineCheckbox3">
            prysznice
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox3"
            value="option3"
          />
        </div>

        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineCheckbox4">
            parking
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox4"
            value="option4"
          />
        </div>
        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineCheckbox5">
            maszyny z jedzeniem
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox5"
            value="option5"
          />
        </div>
        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineCheckbox6">
            bufet/stołówka
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox6"
            value="option6"
          />
        </div>
      </div>

      <div></div>
      <div></div>
      <button>DODAJ</button>
    </form>
  );
}
