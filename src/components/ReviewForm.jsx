// src/components/ReviewForm.jsx
import React, { useState } from 'react';
import { createResena } from '../services/api';
import './ReviewForm.css';

function ReviewForm({ productoId, onReviewSubmitSuccess }) {
    const [calificacion, setCalificacion] = useState(0);
    const [hoverRating, setHoverRating] = useState(0); // Para efecto hover en estrellas
    const [comentario, setComentario] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleStarClick = (ratingValue) => {
        setCalificacion(ratingValue);
    };

    const handleStarHover = (ratingValue) => {
        setHoverRating(ratingValue);
    };

    const handleStarLeave = () => {
        setHoverRating(0); // Reset hover al salir
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (calificacion === 0 || !comentario.trim()) {
            setError('Por favor, proporciona una calificación y un comentario.');
            return;
        }
        setSubmitting(true);
        setError(null);
        setSuccessMessage('');

        const data = {
            calificacion,
            comentario,
            ciudad_resenador: ciudad.trim() || null, // Enviar null si está vacío
        };

        try {
            await createResena(productoId, data);
            setSuccessMessage('¡Gracias por tu reseña!');
            // Limpiar formulario
            setCalificacion(0);
            setComentario('');
            setCiudad('');
            // Notificar al padre que se envió con éxito para refrescar
            if (onReviewSubmitSuccess) {
                onReviewSubmitSuccess();
            }
            // Ocultar mensaje después de unos segundos
            setTimeout(() => setSuccessMessage(''), 5000);
        } catch (err) {
            console.error("Error submitting review:", err.response?.data || err.message);
            setError(err.response?.data?.detail || 'Error al enviar la reseña. Inténtalo de nuevo.');
            // Ocultar mensaje de error después de unos segundos
            setTimeout(() => setError(null), 7000);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="review-form">
            <h4>Deja tu reseña</h4>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <div className="form-group rating-group">
                <label>Calificación:</label>
                <div className="star-input" onMouseLeave={handleStarLeave}>
                    {[...Array(5)].map((_, index) => {
                        const ratingValue = index + 1;
                        return (
                            <span
                                key={ratingValue}
                                className={`star ${ratingValue <= (hoverRating || calificacion) ? 'filled' : 'empty'}`}
                                onClick={() => handleStarClick(ratingValue)}
                                onMouseEnter={() => handleStarHover(ratingValue)}
                            >
                ★
              </span>
                        );
                    })}
                    <span className="rating-value-display">{calificacion > 0 ? `(${calificacion}/5)` : '(Selecciona)'}</span>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor={`comentario-${productoId}`}>Comentario:</label>
                <textarea
                    id={`comentario-${productoId}`}
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    required
                    rows="4"
                    disabled={submitting}
                />
            </div>

            <div className="form-group">
                <label htmlFor={`ciudad-${productoId}`}>Ciudad (Opcional):</label>
                <input
                    type="text"
                    id={`ciudad-${productoId}`}
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    disabled={submitting}
                />
            </div>

            <button type="submit" disabled={submitting || calificacion === 0}>
                {submitting ? 'Enviando...' : 'Enviar Reseña'}
            </button>
        </form>
    );
}

export default ReviewForm;