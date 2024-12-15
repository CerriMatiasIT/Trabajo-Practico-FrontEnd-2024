import CarritoCompras from './carrito.js';

// Inicializar el carrito
const carrito = new CarritoCompras();

// Función para agregar servicios al carrito
function agregarAlCarrito(servicio) {
    carrito.agregarServicio({
        id: servicio.id,
        nombre: servicio.nombre,
        precio: parseFloat(servicio.precio)
    });
    
    // Opcional: Mostrar mensaje de confirmación
    alert(`${servicio.nombre} agregado al carrito`);
}

// Agregar los event listeners a los botones de "Agregar al carrito"
document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregar = document.querySelectorAll('.btn-agregar-carrito');
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', () => {
            const servicio = {
                id: boton.dataset.id,
                nombre: boton.dataset.nombre,
                precio: boton.dataset.precio
            };
            agregarAlCarrito(servicio);
        });
    });
}); 