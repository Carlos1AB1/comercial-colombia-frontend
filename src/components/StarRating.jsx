// src/components/StarRating.jsx
import React from 'react';
import './StarRating.css'; // Necesitarás crear este archivo CSS

function StarRating({ rating }) {
    const totalStars = 5;
    const filledStars = Math.round(rating); // Redondea para llenar estrellas completas

    return (
        <div className="star-rating">
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <span key={starValue} className={starValue <= filledStars ? 'star filled' : 'star empty'}>
            ★
          </span>
                );
            })}
            {/* Opcional: mostrar el número exacto */}
            {/* <span className="rating-number">({rating.toFixed(1)})</span> */}
        </div>
    );
}

export default StarRating;