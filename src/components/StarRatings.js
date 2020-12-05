import React from 'react';
import { FaStar } from 'react-icons/fa';

const StarRatings = () => {
    return(
        <div className="star-ratings">
            {[...Array(5)].map(star => {
                return (
                    <label>
                        <input type="radio" name="rating" />
                        <FaStar className="star" size={20} />
                    </label>
                )
            })}
        </div>

    )
}

export default StarRatings;