import React, {useState, useEffect} from 'react';
import { FaStar } from 'react-icons/fa';
import firebase from "../firebase";
import Tooltip from "@material-ui/core/Tooltip";
import Cookies from "js-cookie"

const db = firebase.firestore();


const StarRatings = (props) => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const scoreRef = db.collection("scores").doc(props.gymID);
    const userID = Cookies.get('user');

    return (
        <div className="star-ratings">
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                useEffect(() => {
                    scoreRef.get()
                        .then((docSnapshot) => {
                            if (docSnapshot.exists) {
                               setRating(docSnapshot.data()[userID])
                            }
                        });
                }, [])

                const handleClick = () => {

                    setRating(ratingValue);

                    scoreRef.get()
                    .then((docSnapshot) => {
                        if (docSnapshot.exists) {
                            if (docSnapshot.data().scored.includes(userID)) {
                                scoreRef.update({all: firebase.firestore.FieldValue.arrayRemove(docSnapshot.data()[userID])});
                                scoreRef.update({all: firebase.firestore.FieldValue.arrayUnion(ratingValue)});
                                scoreRef.update({[userID]: ratingValue});
                            } else {
                                scoreRef.update({
                                    all: firebase.firestore.FieldValue.arrayUnion(ratingValue),
                                    scored: firebase.firestore.FieldValue.arrayUnion(userID),
                                    [userID]: ratingValue
                                });

                            }
                        } else { 
                            scoreRef.set({[userID]: ratingValue, all: [ratingValue], scored: userID});
                        }
                        
                    });
                }

                return (
                    <div style={props.disabled ? {opacity: "0.9"} : {}}>
                    {props.disabled ?
                    <Tooltip title="Ocenianie będzie dostępne po pierwszej dacie rezerwacji" placement="top">
                    <label>
                        <input 
                            type="radio" 
                            name="rating" 
                        />
                        <FaStar 
                            className="star" 
                            size={15} 
                            color={"#ececec"}
                        />
                    </label>
                    </Tooltip>
                    :
                    <label>
                        <input 
                            type="radio" 
                            name="rating" 
                            value={ratingValue} 
                            onClick={() => { handleClick()}}
                        />
                        <FaStar 
                            className="star" 
                            size={15} 
                            color={ratingValue <= (hover || rating) ? "#ffa841" : "#ececec"}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                    }
                    </div>
                )
            })}
        </div>

    )
}

export default StarRatings;