import CarritoCompras from '../scripts/carrito.js';

    // Inicializar el carrito
    const carrito = new CarritoCompras();
    const cartItemsList = document.getElementById('cart-items');
    const buyButton = document.getElementById('buy-button');

    function mostrarCarrito() {
        cartItemsList.innerHTML = ''; // Limpiar lista actual
        
        const items = carrito.obtenerCarrito();
        
        if (items.length === 0) {
            cartItemsList.innerHTML = '<li>No hay items en el carrito. Visita nuestros <a href="productos.html">productos</a></li>';
            return;
        }

        // Crear tabla
        const table = document.createElement('table');
        table.className = 'table';
        
        // Cabecera de la tabla
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio unitario</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3"><strong>Total:</strong></td>
                    <td>$${carrito.total.toFixed(2)}</td>
                </tr>
            </tfoot>
        `;

        // Agregar items a la tabla
        const tbody = table.querySelector('tbody');
        items.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.nombre}</td>
                <td>${item.cantidad}</td>
                <td>$${item.precio.toFixed(2)}</td>
                <td>$${(item.precio * item.cantidad).toFixed(2)}</td>
            `;
            tbody.appendChild(tr);
        });

        cartItemsList.appendChild(table);
    }

    // Mostrar carrito inicial
    mostrarCarrito();

    // Manejar click en botón de compra
    buyButton.addEventListener('click', () => {
        if (carrito.obtenerCarrito().length === 0) {
            alert('El carrito está vacío');
            return;
        }
        
        carrito.limpiarCarrito();
        mostrarCarrito();
        alert('¡Gracias por tu compra!');
    });