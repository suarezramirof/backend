const socket = io.connect();

const keys = {
  productos: "productos",
  nuevoProducto: "nuevoProducto",
  cargarProducto: "cargarProducto",
  mensajes: "mensajes",
  nuevoMensaje: "nuevoMensaje",
  enviarMensaje: "enviarMensaje",
};

// updateProductos();

function cargarProducto(e) {
  const producto = {
    nombre: document.getElementById("title").value,
    precio: parseFloat(document.getElementById("price").value),
    foto: document.getElementById("thumbnail").value,
  };
  socket.emit(keys.cargarProducto, producto);
  document.getElementById("title").value = "";
  document.getElementById("price").value = "";
  document.getElementById("thumbnail").value = "";
  return false;
}

function enviarMensaje() {
  const fechaHora = new Date();
  const fecha = fechaHora.toLocaleDateString();
  const hora = fechaHora.toLocaleTimeString();
  const mensaje = {
    email: document.getElementById("mail").value,
    msj: document.getElementById("msj").value,
    date: fecha + " " + hora,
  };
  socket.emit(keys.enviarMensaje, mensaje);
  document.getElementById("msj").value = "";
  return false;
}

socket.on(keys.nuevoProducto, (productos) => {
  updateProductos({ items: productos });
});

socket.on(keys.nuevoMensaje, (mensajes) => {
  updateMensajes({ msjs: mensajes });
});

socket.on("error", ({ error, status }) => {
  alert(`Error: ${error}. Código: ${status}`);
});

function updateProductos(datos) {
  fetch("views/partials/productos.hbs")
    .then((resp) => resp.text())
    .then((plantilla) => {
      const template = Handlebars.compile(plantilla);
      const filled = template(datos);
      document.getElementById("productos").innerHTML = filled;
    });
}

function updateMensajes(msjs) {
  fetch("views/partials/mensajes.hbs")
    .then((resp) => resp.text())
    .then((plantilla) => {
      const template = Handlebars.compile(plantilla);
      const filled = template(msjs);
      document.getElementById("mensajes").innerHTML = filled;
      let div = document.getElementById("mensajes");
      div.lastElementChild.scrollIntoView({ behavior: "smooth" });
    });
}
