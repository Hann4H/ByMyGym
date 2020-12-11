import React, {useState, useEffect} from 'react';
import { FaStar } from 'react-icons/fa';
import firebase from "../firebase";

const db = firebase.firestore();

const WeighedRating = (props) => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [stos, setStos] = useState(0);
    

    useEffect(() => {
        const scoreRef = db.collection("scores").doc(props.gymID);

        scoreRef.get()
            .then((docSnapshot) => {
                var total = 0;
                for(var i = 0; i < docSnapshot.data().all.length; i++) {
                    total += docSnapshot.data().all[i];
                }
                const avg = total / docSnapshot.data().all.length;
                
                setStos(total / docSnapshot.data().all.length)
                console.log(avg) 
            });
            
    }, [])

    return (
        <div className="star-ratings">
                    <label>
                        <FaStar 
                            className="weighed-star" 
                            size={20} 
                            color={3 ? "#ffa841" : "#ececec"}
                        />
                    </label>        
        </div>

    )
}

export default WeighedRating;