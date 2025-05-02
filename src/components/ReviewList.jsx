// src/components/ReviewList.jsx
import React from 'react';
import StarRating from './StarRating'; // Componente para mostrar estrellas
import './ReviewList.css';

function ReviewList({ resenas }) {
    if (!resenas || resenas.length === 0) {
        return <p>Todavía no hay reseñas para este producto.</p>;
    }

    return (
        <div className="review-list">
            {resenas.map((resena) => (
                <div key={resena.id} className="review-item">
                    <div className="review-header">
                        <StarRating rating={resena.calificacion} />
                        <span className="review-city">{resena.ciudad_resenador || 'Anónimo'}</span>
                        <span className="review-date">
              {new Date(resena.fecha_hora_resena).toLocaleDateString('es-CO', {
                  year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
              })}
            </span>
                    </div>
                    <p className="review-comment">{resena.comentario}</p>
                </div>
            ))}
        </div>
    );
}

export default ReviewList;