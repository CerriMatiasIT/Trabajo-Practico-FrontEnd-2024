function verificarFormulario(contacto) {
    const { nombre, email, mensaje } = contacto;

    if (nombre && email && mensaje) {
        console.log("Todos los campos están completos.");
    } else {
        console.log("Por favor, completa todos los campos del formulario.");
    }
}

// Ejemplo de uso
const formularioContacto = {
    nombre: "Matías Cerri",
    email: "matias@example.com",
    mensaje: "¡Hola! Estoy interesado en más información."
};

verificarFormulario(formularioContacto);