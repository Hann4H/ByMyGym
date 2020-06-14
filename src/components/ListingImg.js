import React, {Component} from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import "firebase/storage";


export default function ListingImg({children, title, subtitle}) {
        return (
            <div className="img-listing">
                <h1>{title}</h1>
                <div></div>
                <p>{subtitle}</p>
                {children}
            </div>
        )
    }
    
    