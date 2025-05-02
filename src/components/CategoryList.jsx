// src/components/CategoryList.jsx
import React from 'react';
import './CategoryList.css';

function CategoryList({ categorias, selectedCategory, onSelectCategory }) {
    return (
        <ul className="category-list">
            <li
                key="all"
                className={selectedCategory === null ? 'active' : ''}
                onClick={() => onSelectCategory(null)} // null para mostrar todas
            >
                Todas
            </li>
            {categorias.map((categoria) => (
                <li
                    key={categoria.id}
                    className={selectedCategory === categoria.id ? 'active' : ''}
                    onClick={() => onSelectCategory(categoria.id)}
                >
                    {categoria.nombre}
                    {categoria.imagen_url && (
                        <img src={categoria.imagen_url} alt={categoria.nombre} className="category-list-image"/>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default CategoryList;