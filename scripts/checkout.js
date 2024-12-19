class CarritoCompras {
    constructor() {
        this.carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        this.total = 0;
        this.cantidadItems = 0;
        this.init();
    }

    init() {
        this.actualizarContadores();
        // Cargar los servicios temporales de sessionStorage
        const serviciosTemp = JSON.parse(sessionStorage.getItem('serviciosTemp')) || [];
        if (serviciosTemp.length > 0) {
            this.carrito = [...this.carrito, ...serviciosTemp];
            this.guardarCarrito();
            sessionStorage.removeItem('serviciosTemp');
        }
    }

    agregarServicio(servicio) {
        const servicioExistente = this.carrito.find(item => item.id === servicio.id);
        
        if (servicioExistente) {
            servicioExistente.cantidad++;
        } else {
            this.carrito.push({
                id: servicio.id,
                nombre: servicio.nombre,
                precio: servicio.precio,
                cantidad: 1
            });
        }

        this.guardarCarrito();
        this.actualizarContadores();
    }

    eliminarServicio(servicioId) {
        this.carrito = this.carrito.filter(item => item.id !== servicioId);
        this.guardarCarrito();
        this.actualizarContadores();
    }

    actualizarCantidad(servicioId, cantidad) {
        const servicio = this.carrito.find(item => item.id === servicioId);
        if (servicio) {
            servicio.cantidad = cantidad;
            if (servicio.cantidad <= 0) {
                this.eliminarServicio(servicioId);
            } else {
                this.guardarCarrito();
                this.actualizarContadores();
            }
        }
    }

    guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
    }

    guardarServicioTemporal(servicio) {
        const serviciosTemp = JSON.parse(sessionStorage.getItem('serviciosTemp')) || [];
        serviciosTemp.push(servicio);
        sessionStorage.setItem('serviciosTemp', JSON.stringify(serviciosTemp));
    }

    actualizarContadores() {
        this.total = this.carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        this.cantidadItems = this.carrito.reduce((sum, item) => sum + item.cantidad, 0);
        
        // Actualizar elementos del DOM si existen
        const totalElement = document.getElementById('carrito-total');
        const cantidadElement = document.getElementById('carrito-cantidad');
        
        if (totalElement) totalElement.textContent = `$${this.total.toFixed(2)}`;
        if (cantidadElement) cantidadElement.textContent = this.cantidadItems.toString();
    }

    obtenerCarrito() {
        return this.carrito;
    }

    limpiarCarrito() {
        this.carrito = [];
        this.guardarCarrito();
        this.actualizarContadores();
    }
}

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