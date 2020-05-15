import room1 from "./img/gym_1.png";
import room2 from "./img/gym_2.png";
import img1 from "./img/header_img.png";


export default [
  {
    sys: {
      id: "1"
    },
    fields: {
      name: "SP 23",
      slug: "sp23",
      price: 100,
      size: 200,
      capacity: 1,
      images: [
        {
          fields: {
            file: {
              url: room1
            }
          }
        },
        {
          fields: {
            file: {
              url: img1
            }
          }
        }
      ]
    }
  },
  {
    sys: {
      id: "2"
    },
    fields: {
      name: "SP 1",
      slug: "sp1",
      price: 150,
      size: 250,
      capacity: 1,
      images: [
        {
          fields: {
            file: {
              url: room2
            }
          }
        },
        {
          fields: {
            file: {
              url: img1
            }
          }
        }
      ]
    }
  }
];