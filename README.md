# Comercial Colombia Frontend

Frontend para el catálogo virtual de muestras comerciales. Desarrollado con React, Vite y React Router.

## 📋 Descripción

Esta aplicación proporciona una interfaz de usuario para el catálogo de muestras comerciales, permitiendo:

- Explorar productos por categorías
- Ver detalles de productos con imágenes, videos y descripción
- Interactuar con productos mediante likes/dislikes
- Ver y añadir reseñas a los productos

## 🛠️ Tecnologías

- **React 19**: Biblioteca para construir interfaces de usuario
- **Vite 6**: Empaquetador y servidor de desarrollo
- **React Router 7**: Enrutamiento para aplicaciones React
- **Axios**: Cliente HTTP para realizar peticiones a la API
- **CSS Modular**: Estilos organizados por componente

## 🚀 Instalación

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Backend API en funcionamiento (proyecto backend de Comercial Colombia)

### Pasos de instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/comercial_colombia_frontend.git
   cd comercial_colombia_frontend
   ```

2. Instalar dependencias:
   ```bash
   npm install
   # o
   yarn
   ```

3. Crear archivo `.env` en la raíz del proyecto con la URL de la API:
   ```
   VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
   ```

4. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. Abrir el navegador en http://localhost:5173

## 📁 Estructura del Proyecto

```
comercial_colombia_frontend/
├── public/               # Archivos públicos estáticos
├── src/
│   ├── assets/           # Recursos estáticos (imágenes, SVG)
│   ├── components/       # Componentes reutilizables
│   │   ├── CategoryList/     # Lista de categorías
│   │   ├── ImageGallery/     # Galería de imágenes
│   │   ├── ProductCard/      # Tarjeta de producto
│   │   ├── ReactionButtons/  # Botones de reacción (like/dislike)
│   │   ├── ReviewForm/       # Formulario de reseñas
│   │   ├── ReviewList/       # Lista de reseñas
│   │   └── StarRating/       # Componente de calificación por estrellas
│   ├── pages/            # Páginas principales
│   │   ├── HomePage/         # Página de inicio con lista de productos
│   │   └── ProductDetailPage/ # Página de detalle de producto
│   ├── services/         # Servicios y utilidades
│   │   └── api.js            # Cliente API y funciones para peticiones
│   ├── App.jsx           # Componente principal con enrutamiento
│   ├── main.jsx          # Punto de entrada de la aplicación
│   └── index.css         # Estilos globales
└── .env                  # Variables de entorno (no incluido en el repositorio)
```

## 📱 Páginas Principales

### Home Page
- Lista de productos filtrable por categorías
- Barra lateral de categorías 
- Visualización en cuadrícula de tarjetas de productos

### Product Detail Page
- Galería de imágenes con vista principal y miniaturas
- Reproducción de video (si está disponible)
- Botones de reacción (like/dislike)
- Formulario para añadir reseñas
- Lista de reseñas existentes con calificación por estrellas

## 🧩 Componentes Principales

- **ProductCard**: Tarjeta que muestra la información básica de un producto
- **CategoryList**: Lista de categorías con selección activa
- **ImageGallery**: Visualizador de imágenes con imagen principal y miniaturas
- **ReactionButtons**: Botones para reaccionar a los productos (like/dislike)
- **ReviewForm**: Formulario para enviar reseñas con calificación por estrellas
- **ReviewList**: Listado de reseñas con información detallada
- **StarRating**: Componente visual para mostrar calificaciones con estrellas

## 🔄 Integración con Backend

La aplicación se comunica con el backend a través de la API RESTful. Los endpoints principales son:

- `GET /api/v1/categorias/`: Obtiene todas las categorías
- `GET /api/v1/productos/`: Obtiene todos los productos (con filtro opcional por categoría)
- `GET /api/v1/productos/{id}/`: Obtiene detalle de un producto
- `POST /api/v1/resenas/`: Crea una nueva reseña
- `POST /api/v1/reacciones/`: Registra una reacción (like/dislike)

La configuración de la URL base se realiza a través de la variable de entorno `VITE_API_BASE_URL`.

## 🔧 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Genera los archivos para producción
- `npm run lint`: Ejecuta el linter para verificar el código
- `npm run preview`: Previsualiza la versión de producción localmente

## 🔍 Funcionalidades Destacadas

- **Navegación Fluida**: Enrutamiento SPA para una experiencia sin recargas
- **Diseño Responsivo**: Adaptable a distintos tamaños de pantalla
- **Galería de Imágenes**: Visualización principal y miniaturas con navegación
- **Sistema de Reacciones**: Permite a los usuarios expresar opinión mediante likes/dislikes
- **Sistema de Reseñas**: Incluye calificación por estrellas y comentarios

## ⚙️ Configuración

### Variables de Entorno

- `VITE_API_BASE_URL`: URL base de la API del backend

