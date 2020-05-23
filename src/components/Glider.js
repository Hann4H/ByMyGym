import React, { Component } from 'react';
import { Glide, GlideProps } from 'react-glide';
import 'react-glide/lib/reactGlide.css';


export default class Glider extends Component {
  render() {
    return (
      <Glide height={500} width={500}>
        <img src="https://picsum.photos/id/312/600/600" />
        <img src="https://picsum.photos/id/313/600/600" />
        <img src="https://picsum.photos/id/314/600/600" />

        <div>
          <svg
            width="200"
            height="250"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="10"
              y="10"
              width="30"
              height="30"
              stroke="blue"
              fill="transparent"
              strokeWidth="5"
            />
          </svg>
        </div>
      </Glide>
    );
  }
}