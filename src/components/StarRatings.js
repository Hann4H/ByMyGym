import React, {useState} from 'react';
import { FaStar } from 'react-icons/fa';
import firebase from "../firebase";

const db = firebase.firestore();

const StarRatings = (props) => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

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
                        <input 
                            type="radio" 
                            name="rating" 
                            value={ratingValue} 
                            onClick={() => { handleClick()}}
                        />
                        <FaStar 
                            className="star" 
                            size={20} 
                            color={ratingValue <= (hover || rating) ? "#ffa841" : "#ececec"}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                )
            })}
        </div>

    )
}

export default StarRatings;