// src/components/ReactionButtons.jsx
import React, { useState } from 'react';
import { createReaccion } from '../services/api';
import './ReactionButtons.css';

function ReactionButtons({ productId, initialLikes, initialDislikes, onReactionSuccess }) {
    // Usamos el estado local para una respuesta visual inmediata,
    // aunque los datos reales vendrán del refresh.
    const [likes, setLikes] = useState(initialLikes ?? 0);
    const [dislikes, setDislikes] = useState(initialDislikes ?? 0);
    const [submitting, setSubmitting] = useState(null); // 'like', 'dislike', o null
    const [error, setError] = useState('');
    const [reacted, setReacted] = useState(null); // 'like', 'dislike' o null para saber si ya reaccionó

    const handleReaction = async (tipo) => {
        if (submitting) return; // Evitar doble click

        setSubmitting(tipo);
        setError('');

        try {
            const response = await createReaccion(productId, tipo);

            // El backend ahora maneja la actualización o informa de conflicto.
            // Si la respuesta es 200 OK, significa que actualizó una existente.
            // Si es 201 Created, significa que creó una nueva.
            // Si es 409 Conflict, significa que intentó reaccionar de nuevo con la misma opción.

            if (response.status === 200 || response.status === 201) {
                setReacted(tipo); // Marcar como reaccionado con el tipo actual
                // Actualizar contadores localmente para feedback inmediato (opcional, el refresh lo hará)
                // Esto es simplificado, el refresh es más fiable
                if (response.data.tipo_reaccion === 'like') {
                    setLikes(prev => tipo === 'like' ? (response.status === 201 ? prev + 1 : prev) : (response.status === 200 ? prev -1 : prev)); // Si cambió de dislike a like
                    setDislikes(prev => tipo === 'dislike' ? prev : (response.status === 200 ? prev -1 : prev));
                } else {
                    setDislikes(prev => tipo === 'dislike' ? (response.status === 201 ? prev + 1 : prev) : (response.status === 200 ? prev - 1: prev));
                    setLikes(prev => tipo === 'like' ? prev : (response.status === 200 ? prev - 1 : prev));
                }
                // Llamar a la función de refresh pasada por el padre
                if (onReactionSuccess) {
                    onReactionSuccess();
                }
            }
        } catch (err) {
            console.error("Error submitting reaction:", err.response?.data || err.message);
            if (err.response?.status === 409) {
                setError('Ya has reaccionado a este producto.');
                // Podríamos leer la reacción existente y marcar el botón correspondiente
                setReacted(tipo); // Asumimos que intentó reaccionar igual
            } else if (err.response?.status === 200 && err.response?.data?.detail?.includes('misma reacción')) {
                // Manejar el caso donde el backend devuelve 200 OK pero informa que no cambió nada
                setError('Ya habías registrado esta reacción.');
                setReacted(tipo);
            }
            else {
                setError('Error al registrar tu reacción.');
            }
            // Limpiar error después de un tiempo
            setTimeout(() => setError(''), 5000);
        } finally {
            setSubmitting(null);
        }
    };

    return (
        <div className="reaction-buttons">
            {error && <p className="error-message">{error}</p>}
            <button
                onClick={() => handleReaction('like')}
                disabled={submitting === 'like' || submitting === 'dislike'}
                className={`reaction-button like-button ${reacted === 'like' ? 'reacted' : ''} ${submitting === 'like' ? 'submitting' : ''}`}
                aria-pressed={reacted === 'like'}
            >
                👍 <span className="count">{likes}</span>
            </button>
            <button
                onClick={() => handleReaction('dislike')}
                disabled={submitting === 'like' || submitting === 'dislike'}
                className={`reaction-button dislike-button ${reacted === 'dislike' ? 'reacted' : ''} ${submitting === 'dislike' ? 'submitting' : ''}`}
                aria-pressed={reacted === 'dislike'}
            >
                👎 <span className="count">{dislikes}</span>
            </button>
        </div>
    );
}

export default ReactionButtons;