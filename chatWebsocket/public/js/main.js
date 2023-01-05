const socket = io.connect();

// updateProductos();

function cargarProducto(e) {
  const producto = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
  };
  socket.emit("cargarProducto", producto);
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
  socket.emit("enviarMensaje", mensaje);
  document.getElementById("msj").value = "";
  return false;
}

socket.on("nuevoProducto", (productos) => {
  updateProductos({items:productos});
});

socket.on("nuevoMensaje", (mensajes) => {
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
