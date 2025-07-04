
# 🧁 Caprichos Pastelería

## 📋 Descripción

Capricho Pastelería es una aplicación web de e-commerce desarrollada con React, que permite a los usuarios explorar, buscar y comprar productos de pastelería de manera online. El proyecto simula una tienda real, integrando carrito de compras, checkout y conexión con Firebase para la gestión de productos y órdenes.

 ## 🚀Tecnologías Utilizadas

- React
- Firebase
- React Router
- Context API
- CSS
- Bootstrap
- React Icons
- Git

## ✨ Características Principales

- Navegación SPA (Single Page Application) sin recargas.
- Barra de navegación responsive con acceso a catálogo, categorías y carrito.
- Catálogo dinámico de productos obtenidos desde Firestore.
- Filtros por categoría y búsqueda de productos.
- Vista de detalle de cada producto.
- Carrito de compras global con suma de cantidades, subtotales y total.
- Checkout con formulario y generación de órdenes en Firestore.
- Notificaciones de acciones (producto agregado, carrito vacío, etc).
- Renderizado condicional de loaders y mensajes de estado.
- Buenas prácticas de arquitectura y separación de componentes.

## 🛠️ Instalación y uso

- git clone https://github.com/tuusuario/capricho-pasteleria.git
- cd capricho-pasteleria
- npm install
* Configura las variables de entorno:
- Crea un archivo .env en la raíz del proyecto con tus credenciales de Firebase:

     VITE_FIREBASE_API_KEY=...
     VITE_FIREBASE_AUTH_DOMAIN=...
     VITE_FIREBASE_PROJECT_ID=...
     VITE_FIREBASE_STORAGE_BUCKET=...
     VITE_FIREBASE_MESSAGING_SENDER_ID=...
     VITE_FIREBASE_APP_ID=...

* Inicia la app en modo desarrollo:
- npm run dev

## 📦 Estructura del proyecto

src/
  component/
    Cart/
    CartWidget/
    Checkout/
    ItemCount/
    ItemDetail/
    ItemDetailConteiner/
    ItemList/
    ItemListContainer/
    NavBar/
    Notification/
    ProductCard/
    SearchBar/
  context/
    CartContext.jsx
  firebaseConfig.js
  main.jsx
  App.jsx

## 📋 Notas

Las credenciales de Firebase no están incluidas en el repositorio por seguridad. Debes solicitarlas o crearlas en tu propio proyecto de Firebase.
El deploy puede realizarse fácilmente en Vercel, Netlify o cualquier servicio compatible con React y variables de entorno.

### 👩‍💻 Autor
Juan Pablo Astrada [text](https://github.com/JuanAstrada7)