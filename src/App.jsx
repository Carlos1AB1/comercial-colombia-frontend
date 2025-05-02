// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import './App.css'; // Estilos específicos de App

function App() {
    return (
        <Router>
            <div className="App">
                <header className="app-header">
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h1>Comercial Colombia - Muestras</h1>
                    </Link>
                    <nav>
                        {/* Puedes añadir más links de navegación aquí si es necesario */}
                        <Link to="/">Inicio</Link>
                        {/* Ejemplo: <Link to="/categorias">Categorías</Link> */}
                    </nav>
                </header>

                <main className="app-main">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/productos/:id" element={<ProductDetailPage />} />
                        {/* Puedes añadir rutas para categorías aquí */}
                        {/* <Route path="/categorias/:categoriaId" element={<CategoryPage />} /> */}
                    </Routes>
                </main>

                <footer className="app-footer">
                    <p>© {new Date().getFullYear()} Comercial Colombia. Todos los derechos reservados.</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;