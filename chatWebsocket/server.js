const Contenedor = require("./src/contenedor.js"); // Clase
const sample = require("./public/productos.json"); // Array inicial de ejemplo
const productos = new Contenedor(sample);

const fs = require("fs");

// Express
const express = require("express");
const app = express();
app.use(express.static("./public"));
app.get("/", (_req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

// Carga de mensajes

const mensajes = [];
fs.readFile("files/mensajes.txt", (err, data) => {
  if (err) console.log(`Error: ${err}`);
  else mensajes.push(...JSON.parse(data));
});

// Socket io

const httpServer = require("http").Server(app);
const io = require("socket.io")(httpServer);

io.on("connection", (socket) => {
  console.log(`Nuevo cliente conectado en socket: ${socket.id}`);
  socket.emit("nuevoProducto", productos.getAll());
  socket.emit("nuevoMensaje", mensajes);
  socket.on("cargarProducto", (datos) => {
    try {
      productos.addItem(datos);
      io.sockets.emit("nuevoProducto", productos.getAll());
    } catch (error) {
      console.log(error);
      socket.emit("error", { error: error.message, status: error.code });
    }
  });
  socket.on("enviarMensaje", (msj) => {
    try {
      mensajes.push(msj);
      fs.writeFile("files/mensajes.txt", JSON.stringify(mensajes), (err) => {
        if (err) {
          console.log(`Error: ${err}`);
        } else {
          io.sockets.emit("nuevoMensaje", mensajes);
        }
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  });
});

// Servidor

const PORT = 8080;
const server = httpServer.listen(PORT, () => {
  console.log(`Servidor listo en el puerto ${server.address().port}`);
});
server.on("error", (error) => {
  console.log(`Error en el servidor: ${error}`);
});
