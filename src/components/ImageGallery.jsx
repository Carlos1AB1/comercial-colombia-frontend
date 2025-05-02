// src/components/ImageGallery.jsx
import React, { useState, useEffect } from 'react';
import './ImageGallery.css';

const placeholderImage = "https://via.placeholder.com/600x400.png?text=Sin+Imagen";

function ImageGallery({ imagenes }) {
    const [mainImage, setMainImage] = useState(placeholderImage);

    useEffect(() => {
        // Establecer imagen principal al cargar o si cambian las imágenes
        const principal = imagenes?.find(img => img.es_principal)?.imagen_url;
        const primera = imagenes?.[0]?.imagen_url;
        setMainImage(principal || primera || placeholderImage);
    }, [imagenes]); // Dependencia: lista de imágenes

    if (!imagenes || imagenes.length === 0) {
        return (
            <div className="image-gallery">
                <img src={placeholderImage} alt="No hay imágenes disponibles" className="main-image" />
            </div>
        );
    }

    return (
        <div className="image-gallery">
            <div className="main-image-container">
                <img
                    src={mainImage}
                    alt="Imagen principal del producto"
                    className="main-image"
                    onError={(e) => { e.target.onerror = null; e.target.src=placeholderImage; }}
                />
            </div>
            {imagenes.length > 1 && (
                <div className="thumbnail-container">
                    {imagenes.map((img) => (
                        <img
                            key={img.id}
                            src={img.imagen_url}
                            alt={img.alt_text || `Imagen ${img.id}`}
                            className={`thumbnail-image ${img.imagen_url === mainImage ? 'active' : ''}`}
                            onClick={() => setMainImage(img.imagen_url)}
                            onError={(e) => { e.target.style.display='none'; }} // Ocultar thumbnail si falla
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ImageGallery;