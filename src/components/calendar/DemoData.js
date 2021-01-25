import Cookies from "js-cookie"

const configData = {
  resources: [
    {
      id: "r0",
      name: "",
      groupOnly: true,
    },
    {
      id: "r1",
      name: "Rezerwacja",
    },
  ],
};

const bookingData = JSON.parse(Cookies.get('events'));

const dane2 = bookingData ? [...bookingData.values()] : [];

console.log("booking data: " + typeof bookingData);
console.log("configData data: " + typeof configData);

const DemoData = { events: dane2, ...configData };
// const DemoData = { events: [...bookingData.values()], ...configData };

// const DemoData = {
//   resources: [
//     {
//       id: "r0",
//       name: "",
//       groupOnly: true,
//     },
//     {
//       id: "r1",
//       name: "Wolne",
//     },
//     {
//       id: "r2",
//       name: "Zarezerwowane",
//     },
//   ],
//   events: [
//     {
//       id: 1,
//       start: "2020-09-10 09:30:00",
//       end: "2020-09-12 23:30:00",
//       resourceId: "r1",
//       title: "I am finished",
//       bgColor: "#D9D9D9",
//       showPopover: false,
//     },
//     {
//       id: 2,
//       start: "2020-09-08 12:30:00",
//       end: "2020-09-10 23:30:00",
//       resourceId: "r2",
//       title: "I am resizable",
//       resizable: true,
//     },
//   ],
// };

export default DemoData;

// {
//   id: 3,
//   start: "2017-12-19 12:30:00",
//   end: "2017-12-20 23:30:00",
//   resourceId: "r3",
//   title: "I am not movable",
//   movable: false,
// },
// {
//   id: 4,
//   start: "2017-12-19 14:30:00",
//   end: "2017-12-20 23:30:00",
//   resourceId: "r4",
//   title: "I am not start-resizable",
//   startResizable: false,
// },
// {
//   id: 5,
//   start: "2017-12-19 15:30:00",
//   end: "2017-12-20 23:30:00",
//   resourceId: "r5",
//   title: "I am not end-resizable",
//   endResizable: false,
// },
// {
//   id: 6,
//   start: "2017-12-19 15:35:00",
//   end: "2017-12-19 23:30:00",
//   resourceId: "r6",
//   title: "I am normal",
// },
// {
//   id: 7,
//   start: "2017-12-19 15:40:00",
//   end: "2017-12-20 23:30:00",
//   resourceId: "r7",
//   title: "I am exceptional",
//   bgColor: "#FA9E95",
// },

// {
//   id: 3,
//   start: "2017-12-19 15:50:00",
//   end: "2017-12-19 23:30:00",
//   resourceId: "r1",
//   title: "I am locked",
//   movable: false,
//   resizable: false,
//   bgColor: "red",
// },
// {
//   id: 4,
//   start: "2017-12-19 16:30:00",
//   end: "2017-12-27 23:30:00",
//   resourceId: "r1",
//   title: "R1 has many tasks 1",
// },
// {
//   id: 5,
//   start: "2017-12-19 17:30:00",
//   end: "2017-12-19 23:30:00",
//   resourceId: "r1",
//   title: "R1 has recurring tasks every week on Tuesday, Friday",
//   rrule: "FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR",
//   bgColor: "#f759ab",
// },
// {
//   id: 6,
//   start: "2017-12-19 18:30:00",
//   end: "2017-12-20 23:30:00",
//   resourceId: "r1",
//   title: "R1 has many tasks 3",
// },
// {
//   id: 7,
//   start: "2017-12-20 18:30:00",
//   end: "2017-12-20 23:30:00",
//   resourceId: "r1",
//   title: "R1 has many tasks 4",
// },
// {
//   id: 8,
//   start: "2017-12-21 18:30:00",
//   end: "2017-12-24 23:30:00",
//   resourceId: "r1",
//   title: "R1 has many tasks 5",
// },
// {
//   id: 9,
//   start: "2017-12-23 18:30:00",
//   end: "2017-12-27 23:30:00",
//   resourceId: "r1",
//   title: "R1 has many tasks 6",
// },
