import React, {Component} from 'react';
import firebase from 'firebase';
import 'firebase/firestore';


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
            gymName: doc.data().gymName
          });
        });

        this.setState({ Gyms });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    }


  /*
    constructor(props) {
        super(props);
        this.state = {
            gyms: []
        };
    };

    componentDidMount() {
        let ref = firebase.database().ref('gyms');
        ref.on('child_added', snapshot => {
            let gyms = snapshot.val();
            console.log(snapshot.val());
            let newState = [];
            for (let gym in gyms) {
                newState.push({
                    gymName: gyms[gym].gymName,
                    street: gyms[gym].street,
                    city: gyms[gym].city,
                    zip: gyms[gym].zip, 
                    height: gyms[gym].height,
                    width: gyms[gym].width,
                    length: gyms[gym].length, 
                    audience: gyms[gym].audience,
                    changingRooms: gyms[gym].changingRooms, 
                    price: gyms[gym].price,
                    id: gyms[gym].id
                });
            }
            this.setState({
                gyms: newState
            });
            console.log('DATA RETRIEVED');
        })
    }

    
    getData = () => {
        let ref = firebase.firestore().collection('gyms').doc();
        ref.on('value', function(snapshot) {
            const state = snapshot.val();
            this.setState(state);
        });
        console.log('DATA RETRIEVED');
    }

    componentDidMount() {
        this.getData();
      }

    
    componentDidMount() {
        const gymRef = firebase.firestore().collection('gyms').doc();
        gymRef.on('value', (snapshot) => {
            let gyms = snapshot.val();
            let newState = [];
            for (let gym in gyms) {
                newState.push({
                    gymName: gyms[gym].gymName,
                    street: gyms[gym].street,
                    city: gyms[gym].city,
                    zip: gyms[gym].zip, 
                    height: gyms[gym].height,
                    width: gyms[gym].width,
                    length: gyms[gym].length, 
                    audience: gyms[gym].audience,
                    changingRooms: gyms[gym].changingRooms, 
                    price: gyms[gym].price,
                    id: gyms[gym].id
                });
            }
            this.setState({
                gyms: newState
            });
        })
    }
*/

    render() {

        return (
            <div>
                hello from gymListing
                {this.state.Gyms.map((gym) => {
                    return (
                        <h3>{gym.gymName}</h3>
                    )
                })}
    
            </div>
        )
    }    
}

export default Listing;