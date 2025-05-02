// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css'; // Necesitarás crear este archivo CSS

// Placeholder simple para imagen si no hay URL
const placeholderImage = "https://via.placeholder.com/300x200.png?text=Sin+Imagen";

function ProductCard({ producto }) {
    // Encuentra la imagen principal o toma la primera
    const imagenPrincipal = producto.imagenes?.find(img => img.es_principal)?.imagen_url ||
        producto.imagenes?.[0]?.imagen_url ||
        placeholderImage;

    return (
        <div className="product-card">
            <Link to={`/productos/${producto.id}`}>
                <img
                    src={imagenPrincipal}
                    alt={producto.nombre}
                    className="product-card-image"
                    onError={(e) => { e.target.onerror = null; e.target.src=placeholderImage; }} // Fallback si la URL falla
                />
            </Link>
            <div className="product-card-body">
                <h3 className="product-card-title">
                    <Link to={`/productos/${producto.id}`}>{producto.nombre}</Link>
                </h3>
                <p className="product-card-category">{producto.categoria_nombre}</p>
                {/* Mostrar conteo de likes/dislikes */}
                <div className="product-card-reactions">
                    <span>👍 {producto.likes_count ?? 0}</span>
                    <span>👎 {producto.dislikes_count ?? 0}</span>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;