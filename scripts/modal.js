// Referencias a elementos del modal
const modal = document.getElementById('custom-modal');
const closeModalButton = document.getElementById('close-modal-button');
const closeModalIcon = document.querySelector('.modal-close');
const modalBody = document.getElementById('modal-body');

// Instancia del carrito

import CarritoCompras from './carrito.js';

const carrito = new CarritoCompras();


// Mostrar modal
function mostrarModal() {
  // Actualizar el contenido del modal
  const carritoItems = carrito.obtenerCarrito();
  if (carritoItems.length === 0) {
    modalBody.innerHTML = '<p>El carrito está vacío.</p>';
  } else {
    modalBody.innerHTML = carritoItems
      .map(
        (item) =>
          `<div>
            <h4>${item.nombre}</h4>
            <p>${item.descripcion}</p>
            <p>Precio: $${item.precio.toFixed(2)}</p>
            <p>Cantidad: ${item.cantidad}</p>
          </div><hr>`
      )
      .join('');
  }

  // Mostrar el modal
  modal.style.display = 'flex';
}

// Ocultar modal
function ocultarModal() {
  modal.style.display = 'none';
}

// Eventos de cierre
closeModalButton.addEventListener('click', ocultarModal);
closeModalIcon.addEventListener('click', ocultarModal);

// Ejemplo: Abre el modal manualmente desde un botón
document.getElementById('cart-button').addEventListener('click', mostrarModal);
