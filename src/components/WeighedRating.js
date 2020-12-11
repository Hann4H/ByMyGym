import React, {useState, useEffect} from 'react';
import { FaStar } from 'react-icons/fa';
import firebase from "../firebase";

const db = firebase.firestore();

const WeighedRating = (props) => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [stos, setStos] = useState([]);

    useEffect(() => {
        const scoreRef = db.collection("scores");

        scoreRef.get()
            .then((docSnapshot) => {
                docSnapshot.forEach(doc => {
                    console.log("=> ", doc.data());
                })
            });

    }, [])

    return (
        <div className="star-ratings">
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                const handleClick = () => {
                    setRating(ratingValue);
                    const scoreRef = db.collection("scores").doc(props.gymID);
                    const userID = localStorage.getItem("user");
                    
                    scoreRef.get()
                    .then((docSnapshot) => {
                        if (docSnapshot.exists) {
                            // scoreRef.update({[userID]: null});
                            scoreRef.update({[userID]: ratingValue});
                        } else { 
                            scoreRef.set({[userID]: ratingValue})
                        }
                    });
                }

                return (
                    <label>
                        {/* <input 
                            type="radio" 
                            name="rating" 
                            value={ratingValue} 
                        /> */}
                        <FaStar 
                            className="weighed-star" 
                            size={20} 
                            color={ratingValue <= (hover || rating) ? "#ffa841" : "#ececec"}
                        />
                    </label>
                )
            })}
        </div>

    )
}

export default WeighedRating;