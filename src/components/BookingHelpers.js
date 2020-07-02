import React from 'react'

export const hours= [
  " 7:00",
  " 7:30",
  " 8:00",
  " 8:30",
  " 9:00",
  " 9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30"
]

export const startTimeSelectOptions = [
  <option value="7:00">7:00</option>,
  // <option value="7:30">7:30</option>,
  <option value="8:00">8:00</option>,
  // <option value="8:30">8:30</option>,
  <option value="9:00">9:00</option>,
  // <option value="9:30">9:30</option>,
  <option value="10:00">10:00</option>,
  // <option value="10:30">10:30</option>,
  <option value="11:00">11:00</option>,
  // <option value="11:30">11:30</option>,
  <option value="12:00">12:00</option>,
  // <option value="12:30">12:30</option>,
  <option value="13:00">13:00</option>,
  // <option value="13:30">13:30</option>,
  <option value="14:00">14:00</option>,
  // <option value="14:30">14:30</option>,
  <option value="15:00">15:00</option>,
  // <option value="15:30">15:30</option>,
  <option value="16:00">16:00</option>,
  // <option value="16:30">16:30</option>,
  <option value="17:00">17:00</option>,
  // <option value="17:30">17:30</option>,
  <option value="18:00">18:00</option>,
  // <option value="18:30">18:30</option>,
  <option value="19:00">19:00</option>,
  // <option value="19:30">19:30</option>,
  <option value="20:00">20:00</option>,
  // <option value="20:30">20:30</option>
]

export const endTimeSelectOptions = [
    // <option value="7:30">7:30</option>,
    <option value="8:00">8:00</option>,
    // <option value="8:30">8:30</option>,
    <option value="9:00">9:00</option>,
    // <option value="9:30">9:30</option>,
    <option value="10:00">10:00</option>,
    // <option value="10:30">10:30</option>,
    <option value="11:00">11:00</option>,
    // <option value="11:30">11:30</option>,
    <option value="12:00">12:00</option>,
    // <option value="12:30">12:30</option>,
    <option value="13:00">13:00</option>,
    // <option value="13:30">13:30</option>,
    <option value="14:00">14:00</option>,
    // <option value="14:30">14:30</option>,
    <option value="15:00">15:00</option>,
    // <option value="15:30">15:30</option>,
    <option value="16:00">16:00</option>,
    // <option value="16:30">16:30</option>,
    <option value="17:00">17:00</option>,
    // <option value="17:30">17:30</option>,
    <option value="18:00">18:00</option>,
    // <option value="18:30">18:30</option>,
    <option value="19:00">19:00</option>,
    // <option value="19:30">19:30</option>,
    <option value="20:00">20:00</option>,
    // <option value="20:30">20:30</option>
]

//  8:30 => [8, 30]
export const formatTime = (time) => {
  let formatedTimeArray = []
  formatedTimeArray = time.split(':').map((item) => parseInt(item, 10))
  return formatedTimeArray
}

export const findGymInfo = (gymId, gymData) => {
  let gymInfo
  gymData.forEach(gym => {
    if (gym._id === gymId) {
      gymInfo = gym
    }
  })
  return gymInfo
}