import React, { Component } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaPhoneSlash, FaVolleyballBall } from 'react-icons/fa';

export default class Services extends Component {
    state={
        services:[
            {
                icon:<FaCalendarAlt/>,
                title:"rezerwacja długoterminowa"
            },
            {
                icon:<FaMapMarkerAlt/>,
                title:"szybka lokalizacja"
            },
            {
                icon:<FaPhoneSlash/>,
                title:"bez rozmów telefonicznych"
            },
            {
                icon:<FaVolleyballBall/>,
                title:"pełne wyposażenie sal"
            }
        ]
    }
    render() {
        return (
        <section className="services">
        <div className="services-center">
          {this.state.services.map(item => {
            return (
              <article key={`item-${item.title}`} className="service">
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
              </article>
            );
          })}
        </div>
      </section>
            
        )
    }
}