import React, {Component} from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import "firebase/storage";


export default function ListingImg(props) {

    const id = props.id;


        firebase.storage().ref().child(`${id}/1.png`).getDownloadURL().then(url => {
            console.log(url)
            return url;


        }).catch(function(error) {
            console.log("Error getting prop: ", error);
        })

        return (
            <></>

        )
    }
    
    