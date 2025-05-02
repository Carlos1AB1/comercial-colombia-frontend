// src/pages/HomePage.jsx
import React, {useState, useEffect} from 'react';
import {getProductos, getCategorias} from '../services/api'; // Importa las funciones de la API
import ProductCard from '../components/ProductCard.jsx'; // Asegúrate de importar con .jsx
import CategoryList from '../components/CategoryList.jsx'; // Asegúrate de importar con .jsx
import './HomePage.css'; // Importa los estilos específicos para esta página

function HomePage() {
    // --- Estados del Componente ---
    const [productos, setProductos] = useState([]); // Almacena la lista de productos a mostrar
    const [categorias, setCategorias] = useState([]); // Almacena la lista de categorías
    const [loading, setLoading] = useState(true); // Indica si los datos se están cargando
    const [error, setError] = useState(null); // Almacena mensajes de error si ocurren
    const [selectedCategory, setSelectedCategory] = useState(null); // Almacena el ID de la categoría seleccionada (null para todas)

    // --- Efecto para Cargar Datos ---
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [catRes, prodRes] = await Promise.all([
                    getCategorias(),
                    getProductos(selectedCategory)
                ]);

                // --- CORRECCIÓN AQUÍ ---
                // Extrae 'results' o usa un array vacío como fallback
                setCategorias(catRes.data.results || []);
                setProductos(prodRes.data.results || []); // Aplicar también a productos por seguridad

            } catch (err) {
                console.error("Error fetching data:", err);
                setError('Error al cargar los datos. Inténtalo de nuevo más tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedCategory]);// <-- Dependencia: El efecto se vuelve a ejecutar si 'selectedCategory' cambia

    // --- Manejador para Selección de Categoría ---
    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId); // Actualiza el estado de la categoría seleccionada
    };

    // --- Renderizado Condicional ---
    // Muestra mensaje mientras carga
    if (loading) return <p className="loading-message">Cargando productos...</p>;
    // Muestra mensaje si hubo un error
    if (error) return <p className="error-message">{error}</p>;

    // --- Renderizado Principal ---
    return (
        <div className="home-page"> {/* Contenedor principal de la página */}
            {/* Barra Lateral de Categorías */}
            <aside className="category-sidebar">
                <h2>Categorías</h2>
                <CategoryList // Renderiza el componente que muestra la lista de categorías
                    categorias={categorias} // Pasa la lista de categorías
                    selectedCategory={selectedCategory} // Pasa la categoría actualmente seleccionada
                    onSelectCategory={handleCategorySelect} // Pasa la función para manejar el clic en una categoría
                />
            </aside>

            {/* Sección Principal con la Cuadrícula de Productos */}
            <section className="product-grid-container">
                {/* Título dinámico basado en si hay una categoría seleccionada */}
                <h2>
                    {selectedCategory
                        ? `Productos en ${categorias.find(c => c.id === selectedCategory)?.nombre || 'Categoría'}` // Busca el nombre de la categoría
                        : 'Todos los Productos'
                    }
                </h2>

                {/* Muestra la cuadrícula si hay productos, o un mensaje si no hay */}
                {productos.length > 0 ? (
                    <div className="product-grid">
                        {/* Mapea la lista de productos y renderiza una ProductCard para cada uno */}
                        {productos.map((producto) => (
                            <ProductCard key={producto.id} producto={producto}/>
                        ))}
                    </div>
                ) : (
                    // Mensaje si no se encontraron productos
                    <p>No hay productos para mostrar {selectedCategory ? 'en esta categoría' : ''}.</p>
                )}
            </section>
        </div>
    );
}

export default HomePage; // Exporta el componente para usarlo en App.jsx