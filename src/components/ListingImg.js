import React, {Component} from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import "firebase/storage";


const ListingImg = ({gym_id}) => {

    state = { Imgs: [] };

    const getImage = (image) => {
        let { state } = this;
        firebase.storage().ref(`/${gym_id}/${gym_id}`).getDownloadURL().then((url) => {
        img_state[image] = url
        this.setState(img_state)
        }).catch((error) => {
        // Handle any errors
        })
    }

        return (
            <div></div>
        )
}

export default ListingImg;
