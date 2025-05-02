// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getProducto } from '../services/api';
import ImageGallery from '../components/ImageGallery';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import ReactionButtons from '../components/ReactionButtons';
import './ProductDetailPage.css';

function ProductDetailPage() {
    const { id } = useParams(); // Obtiene el ID del producto de la URL
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useCallback para evitar recrear la función en cada render
    const fetchProductData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getProducto(id);
            setProducto(response.data);
        } catch (err) {
            console.error("Error fetching product:", err);
            setError('Error al cargar el producto. ¿Existe?');
        } finally {
            setLoading(false);
        }
    }, [id]); // Depende del ID del producto

    useEffect(() => {
        fetchProductData();
    }, [fetchProductData]); // Ejecutar cuando el ID (y por tanto la función) cambie

    // Función para refrescar datos después de una acción (reseña/reacción)
    const handleDataRefresh = () => {
        fetchProductData();
    };

    if (loading) return <p className="loading-message">Cargando detalle del producto...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (!producto) return <p>Producto no encontrado.</p>; // Estado por si acaso

    return (
        <div className="product-detail-page">
            <h2>{producto.nombre}</h2>
            <p className="product-detail-category">Categoría: {producto.categoria_nombre}</p>
            {producto.referencia_muestra && <p className="product-detail-ref">Ref: {producto.referencia_muestra}</p>}

            <div className="product-detail-content">
                <div className="product-detail-media">
                    <ImageGallery imagenes={producto.imagenes} />
                    {producto.video_url && (
                        <div className="product-detail-video">
                            <h3>Video</h3>
                            {/* Asumiendo URL de YouTube/Vimeo - necesita un reproductor más robusto */}
                            {/* Ejemplo simple con iframe, ¡mejora esto para producción! */}
                            {producto.video_url.includes("youtube.com") || producto.video_url.includes("youtu.be") ? (
                                <iframe
                                    width="100%"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${producto.video_url.split('v=')[1] || producto.video_url.split('/').pop()}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen>
                                </iframe>
                            ) : (
                                <a href={producto.video_url} target="_blank" rel="noopener noreferrer">Ver Video</a>
                            )}

                        </div>
                    )}
                </div>

                <div className="product-detail-info">
                    <h3>Descripción</h3>
                    <p>{producto.descripcion || 'No hay descripción disponible.'}</p>

                    <ReactionButtons
                        productId={producto.id}
                        initialLikes={producto.likes_count}
                        initialDislikes={producto.dislikes_count}
                        onReactionSuccess={handleDataRefresh} // Refrescar datos al reaccionar
                    />
                </div>
            </div>


            <div className="product-detail-reviews-section">
                <h3>Reseñas</h3>
                <ReviewForm productoId={producto.id} onReviewSubmitSuccess={handleDataRefresh} />
                <ReviewList resenas={producto.resenas} />
            </div>
        </div>
    );
}

export default ProductDetailPage;