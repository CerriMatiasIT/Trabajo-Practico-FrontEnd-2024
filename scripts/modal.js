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
        (item, index) => `
          <div>
            <h4>${item.nombre}</h4>
            <p>${item.descripcion}</p>
            <p>Precio: $${item.precio.toFixed(2)}</p>
            <p>Cantidad: ${item.cantidad}</p>
            <button class="btn btn-danger" onclick="eliminarProducto(${index})">Eliminar</button>
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

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
  carrito.eliminarProducto(index); // Llamada al método de eliminar del carrito
  mostrarModal(); // Volver a mostrar el modal con el carrito actualizado
}

// Event listeners para cerrar el modal
//closeModalButton.addEventListener('click', ocultarModal);
//closeModalIcon.addEventListener('click', ocultarModal);

// Mostrar el modal cuando el usuario haga clic en el botón del carrito
//document.getElementById('cart-button').addEventListener('click', mostrarModal);
