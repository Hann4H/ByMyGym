import React, {Component} from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import "firebase/storage";


export default function ListingImg({children, id}) {

    var storage = firebase.storage();
    var storageRef = storage.ref();

    storageRef.child(`${id}/1.png`).getDownloadURL().then(function(url) {
        var img = document.getElementById('myimg');
        img.src = url;
      }).catch(function(error) {
        // Handle any errors
      });
      


        return (
            <div className="img-listing">
                <img id="myimg"></img>
                <div></div>
                {children}
            </div>
        )
    }
    
    