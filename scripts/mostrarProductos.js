// script.js

// Array de productos
const productos = [
    { id: 1, nombre: 'Producto 1', precio: 10.99, descripcion: 'Descripción del Producto 1.', imagen: 'https://via.placeholder.com/255' },
    { id: 2, nombre: 'Producto 2', precio: 15.49, descripcion: 'Descripción del Producto 2.', imagen: 'https://via.placeholder.com/255' },
    { id: 3, nombre: 'Producto 3', precio: 7.99, descripcion: 'Descripción del Producto 3.', imagen: 'https://via.placeholder.com/255' },
    { id: 4, nombre: 'Producto 4', precio: 20.00, descripcion: 'Descripción del Producto 4.', imagen: 'https://via.placeholder.com/255' },
    { id: 5, nombre: 'Producto 5', precio: 5.49, descripcion: 'Descripción del Producto 5.', imagen: 'https://via.placeholder.com/255' },
    { id: 6, nombre: 'Producto 6', precio: 12.99, descripcion: 'Descripción del Producto 6.',imagen: 'https://via.placeholder.com/255' }
];

// Función para mostrar los productos en la página
function mostrarProductos() {
    const container = document.getElementById('productos-container');
    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'col-md-4 mb-4';
        productoDiv.innerHTML = `
            <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Precio: $${producto.precio.toFixed(2)}</p>
                    <a href="detalles.html?id=${producto.id}" class="btn btn-outline-light">Ver más</a>
                </div>
            </div>
        `;
        
        // Añadir evento click para mostrar la descripción
        productoDiv.addEventListener('click', () => mostrarDescripcion(producto));

        container.appendChild(productoDiv);
    });
}

function mostrarDescripcion(producto) {
    const descripcionContainer = document.getElementById('descripcion-container');
    descripcionContainer.innerHTML = `
        <h3>Descripción de ${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
    `;
    descripcionContainer.style.display = 'block';
}
mostrarProductos();