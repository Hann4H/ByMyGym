import React, { Component } from "react";
import { useForm } from "react-hook-form";

export default function gymForm() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="gymForm">
      <div className="container-2">
        <label>Nazwa budynku</label>
        <input type="text" name="gymName" ref={register} required />
      </div>
      <div className="container-2">
        <label>Ulica</label>
        <input type="text" name="street" ref={register} required />
      </div>
      <div className="container-2">
        <label>Miasto</label>
        <input type="text" name="city" ref={register} required />
      </div>
      <div className="container-2">
        <label>Kod pocztowy</label>
        <input type="text" name="zip" ref={register} required />
      </div>
      <div className="container-2">
        <label>numer telefonu</label>
        <input type="text" name="zip" ref={register} required />
      </div>
      <div className="container-2">
        <label>adres email</label>
        <input type="text" name="zip" ref={register} required />
      </div>
      <div className="container-2">
        <label>Wysokość</label>
        <input type="text" name="height" min="1" ref={register} required />
      </div>
      <div className="container-2">
        <label>Szerokość</label>
        <input type="text" name="width" min="1" ref={register} required />
      </div>
      <div className="container-2">
        <label>Długość</label>
        <input type="text" name="length" min="1" ref={register} required />
      </div>
      <div className="container-2">
        <label>Ilość miejsc na widowni</label>
        <input type="text" name="audience" min="0" ref={register} />
      </div>
      <div className="container-2">
        <label>Ilość szatń</label>
        <input
          type="text"
          name="changingRooms"
          min="0"
          ref={register}
          required
        />
      </div>
      <div className="container-2">
        <label>Cena za godzinę</label>
        <input type="text" name="price" min="1" ref={register} required />
      </div>
      {/* ////////////////////////////////////////////// */}
      <div className="container-3">
        <label>
          {" "}
          <b>Typ boiska:</b>
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
