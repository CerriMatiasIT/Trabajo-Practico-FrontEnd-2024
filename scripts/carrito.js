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

// Exportar la clase para poder utilizarla en otros archivos
export default CarritoCompras;

// Ejemplo de uso:
/*
const carrito = new CarritoCompras();

// Agregar un servicio
carrito.agregarServicio({
    id: 1,
    nombre: "Servicio de Consultoría",
    precio: 99.99
});

// Eliminar un servicio
carrito.eliminarServicio(1);

// Actualizar cantidad
carrito.actualizarCantidad(1, 2);

// Obtener contenido del carrito
console.log(carrito.obtenerCarrito());
*/
