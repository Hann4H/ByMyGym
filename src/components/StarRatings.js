import React, {useState} from 'react';
import { FaStar } from 'react-icons/fa';

const StarRatings = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return(
        <div className="star-ratings">
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                    <label>
                        <input 
                            type="radio" 
                            name="rating" 
                            value={ratingValue} 
                            onClick={() => setRating(ratingValue)}
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