const socket = io.connect();
const keys = {
  productos: "productos",
  nuevoProducto: "nuevoProducto",
  cargarProducto: "cargarProducto",
  mensajes: "mensajes",
  nuevoMensaje: "nuevoMensaje",
  enviarMensaje: "enviarMensaje",
};

// Normalizr

const schema = normalizr.schema;
const user = new schema.Entity("author");
const schemaMensajes = new schema.Entity("mensajes", { author: user });

// Funciones

function denormalizar(dataNormalizada) {
  const data = normalizr.denormalize(
    dataNormalizada.result,
    [schemaMensajes],
    dataNormalizada.entities
  );
  const largoNormalizado = JSON.stringify(dataNormalizada).length;
  const largoOriginal = JSON.stringify(data).length;
  const compresion = Math.round((largoNormalizado / largoOriginal) * 100);
  showCompresion(compresion);
  return data;
}

function showCompresion(compresion) {
  document.getElementById(
    "compresion"
  ).innerText = `(Compresión: ${compresion}%)`;
}

function enviarMensaje() {
  const fechaHora = new Date();
  const fecha = fechaHora.toLocaleDateString();
  const hora = fechaHora.toLocaleTimeString();
  const mensaje = {
    author: {
      id: document.getElementById("mail").value,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      edad: document.getElementById("edad").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value,
    },
    texto: document.getElementById("msj").value,
    date: fecha + " " + hora,
  };
  socket.emit(keys.enviarMensaje, mensaje);
  document.getElementById("msj").value = "";
  return false;
}

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

// WebSocket

socket.on(keys.nuevoProducto, () => {
  fetch("http://localhost:8080/api/productos-test")
    .then((res) => res.json())
    .then((data) => {
      updateProductos({ items: data });
    });
});

socket.on(keys.nuevoMensaje, (mensajesNormalizados) => {
  const mensajes = denormalizar(mensajesNormalizados);
  updateMensajes({ msjs: mensajes });
});

socket.on("error", ({ error, status }) => {
  alert(`Error: ${error}. Código: ${status}`);
});
