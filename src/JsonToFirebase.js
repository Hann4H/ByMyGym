import React from 'react'
import firebase from "./firebase"

function JsonToFirebase(props) {

    const db = firebase.firestore();

    const ref = db.collection('gyms').doc()

    props.json.map(item => (
        db.collection('gyms').add({
            gymName: item.properties.nazwa,
            street: item.properties.adres,
            city: item.properties.miasto,
            id: ref.id
        })    
    ))

    return null;

}

export default JsonToFirebase;