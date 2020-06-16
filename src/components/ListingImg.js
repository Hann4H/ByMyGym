import React, {Component} from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import "firebase/storage";


export default function ListingImg({id}) {

        firebase.storage().ref().child(`${id}/1.png`).getDownloadURL().then(url => {
            var img = document.getElementById('myimg');
            img.src = url;
            console.log(id, url)
        }).catch(function(error) {
            // Handle any errors
        })

        return (
            <div >
                <img id="myimg"></img>
            </div>
        )
    }
    
    