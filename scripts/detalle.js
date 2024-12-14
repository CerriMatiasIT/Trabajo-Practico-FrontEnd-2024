// Obtener el ID del producto de la URL
const productos = [
    { id: 1, nombre: 'Producto 1', precio: 10.99, descripcion: 'Descripción del Producto 1.', imagen: 'https://via.placeholder.com/255' },
    { id: 2, nombre: 'Producto 2', precio: 15.49, descripcion: 'Descripción del Producto 2.', imagen: 'https://via.placeholder.com/255' },
    { id: 3, nombre: 'Producto 3', precio: 7.99, descripcion: 'Descripción del Producto 3.', imagen: 'https://via.placeholder.com/255' },
    { id: 4, nombre: 'Producto 4', precio: 20.00, descripcion: 'Descripción del Producto 4.', imagen: 'https://via.placeholder.com/255' },
    { id: 5, nombre: 'Producto 5', precio: 5.49, descripcion: 'Descripción del Producto 5.', imagen: 'https://via.placeholder.com/255' },
    { id: 6, nombre: 'Producto 6', precio: 12.99, descripcion: 'Descripción del Producto 6.',imagen: 'https://via.placeholder.com/255' }
];
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Funcion para cargar el header del producto
function cargarHeader() {
    const header = document.getElementById('header');
    const producto = productos.find(p => p.id == productId);
    if (producto) {
        header.innerHTML = `
        <h1>${producto.nombre}</h1>
        <p>Descripción: ${producto.descripcion}</p>
        `;
        }
        else {
            header.innerHTML = '<p>Producto no encontrado.</p>';
        }
        }

// Función para cargar los detalles del producto
function cargarDetallesProducto(id) {
    const producto = productos.find(p => p.id == id);
    if (producto) {
        const detalleContainer = document.getElementById('producto-detalle');
        detalleContainer.innerHTML = `
            <h2>${producto.nombre}</h2>
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <p>${producto.descripcion}</p>
            <button class="btn btn-success">Añadir al carrito</button>
        `;
    } else {
        detalleContainer.innerHTML = '<p>Producto no encontrado.</p>';
    }
}
// Función para generar estrellas de calificación
function generarEstrellas(rating) {
    let estrellas = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            estrellas += '<i class="bi bi-star-fill text-warning"></i>';
        } else {
            estrellas += '<i class="bi bi-star text-warning"></i>';
        }
    }
    return estrellas;
}

// Función para cargar las reseñas del producto
function cargarReseñas(id) {
    const producto = productos.find(p => p.id == id);
    if (producto) {
        // Simular reseñas de ejemplo
        const reseñas = [
            {
                nombre: "Usuario 1",
                avatar: "https://via.placeholder.com/60",
                rating: 4,
                texto: "Muy buen producto, cumple con lo esperado."
            },
            {
                nombre: "Usuario 2", 
                avatar: "https://via.placeholder.com/60",
                rating: 5,
                texto: "Excelente calidad y buen precio."
            }
        ];

        const reviewsContainer = document.createElement('div');
        reviewsContainer.className = 'reviews-container';
        
        const reviewsTitle = document.createElement('h3');
        reviewsTitle.className = 'section-title';
        reviewsTitle.textContent = 'Reseñas de clientes';
        reviewsContainer.appendChild(reviewsTitle);

        reseñas.forEach(reseña => {
            const reviewElement = `
                <div class="review slide-in-bottom">
                    <div class="review-header">
                        <img src="${reseña.avatar}" alt="${reseña.nombre}" class="review-avatar">
                        <div class="review-meta">
                            <div class="review-name">${reseña.nombre}</div>
                            <div class="review-rating">
                                ${generarEstrellas(reseña.rating)}
                            </div>
                        </div>
                    </div>
                    <div class="review-text">${reseña.texto}</div>
                </div>
            `;
            reviewsContainer.innerHTML += reviewElement;
        });

        document.getElementById('producto-detalle').appendChild(reviewsContainer);
    }
}


// Cargar los detalles al iniciar la página
cargarHeader(productId);
cargarDetallesProducto(productId);
cargarReseñas(productId);