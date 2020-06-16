import React, {Component} from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import "firebase/storage";
import ListingImg from './ListingImg';


class Listing extends Component {


state = { Gyms: [] };

  componentDidMount() {
    firebase
      .firestore()
      .collection("gyms")
      .get()
      .then(querySnapshot => {
        const Gyms = [];

        querySnapshot.forEach(function(doc) {
          Gyms.push({
            gymName: doc.data().gymName,
            street: doc.data().street,
            zip: doc.data().zip,
            city: doc.data().city,
            height: doc.data().height,
            width: doc.data().width,
            length: doc.data().width,
            price: doc.data().price,
            id: doc.data().id
          });
        });
        this.setState({ Gyms });
        
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });

      

    }

    

    render() {

        return (
            <div>
                
                {this.state.Gyms.map((gym) => {
                    return (
                        <div className="single-listing">
                            <div className="listing-content">
                                <div className="place-for-img"><ListingImg id={gym.id}></ListingImg></div>
                                <div className="gym-short-info">                            
                                    <h3 className="listing-header">{gym.gymName}</h3>
                                    <p>Adres: {gym.street}, {gym.city} {gym.zip}</p>
                                    <p>Wymiary: {gym.length}m x {gym.width}m x {gym.height}m</p>
                                    <p>Cena za godzinę: {gym.price}zł</p>
                                    <button>więcej informacji</button>
                                </div>
                                
                            </div>
                        </div>
                    )
                })}
    
            </div>
        )
    }    
}

export default Listing;