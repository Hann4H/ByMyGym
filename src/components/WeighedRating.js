import React, {useState, useEffect} from 'react';
import { FaStar } from 'react-icons/fa';
import firebase from "../firebase";
import Tooltip from "@material-ui/core/Tooltip";

const db = firebase.firestore();

const WeighedRating = (props) => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [stos, setStos] = useState(0);
    

    

    return (
        <div className="star-ratings-weighed">
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

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
                    <Tooltip title={"Ocena: " + stos} placement="top">
                    <label>
                        <FaStar 
                            className="weighed-star" 
                            size={20} 
                            color={ratingValue <= stos ? "#ffa841" : "#ececec"}
                        />
                        
                    </label>  
                    </Tooltip>
                )     
            })} 
        </div>

    )
}

export default WeighedRating;