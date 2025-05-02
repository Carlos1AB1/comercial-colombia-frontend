// src/services/api.js
import axios from 'axios';

// Lee la URL base de la API desde las variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Crea una instancia de axios con la configuración base
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// --- Funciones para interactuar con la API ---

export const getCategorias = () => {
    return apiClient.get('/categorias/');
};

export const getProductos = (categoriaId = null) => {
    const params = categoriaId ? { categoria: categoriaId } : {};
    return apiClient.get('/productos/', { params });
};

export const getProducto = (id) => {
    return apiClient.get(`/productos/${id}/`);
};

// Para obtener reseñas de un producto específico
export const getResenasPorProducto = (productoId) => {
    // Podríamos usar la ruta anidada o la ruta base con filtro
    // Usaremos la ruta base con filtro por simplicidad aquí
    return apiClient.get(`/resenas/`, { params: { producto: productoId } });
    // Alternativa ruta anidada: return apiClient.get(`/productos/${productoId}/resenas/`);
};

export const createResena = (productoId, data) => {
    // Asegúrate de que el productoId esté en los datos que envías
    const payload = {
        ...data,
        producto: productoId, // El serializador espera el ID del producto aquí
    };
    // El endpoint base '/resenas/' espera el producto en el payload
    return apiClient.post('/resenas/', payload);
    // Si usaras la ruta anidada, sería:
    // return apiClient.post(`/productos/${productoId}/resenas/`, data); // payload no necesitaría producto
};

export const createReaccion = (productoId, tipo) => {
    const payload = {
        producto: productoId,
        tipo_reaccion: tipo, // 'like' o 'dislike'
    };
    return apiClient.post('/reacciones/', payload);
};

// Podrías añadir funciones para imágenes si las necesitaras por separado,
// pero usualmente vienen anidadas en el producto.

export default apiClient; // Exporta la instancia por si se necesita directamente