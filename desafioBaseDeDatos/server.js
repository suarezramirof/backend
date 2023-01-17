import {
  mostrarProductos,
  crearProductos,
  cargarProducto,
} from "./server/productos.js";

import {
  crearMensajes,
  verMensajes,
  agregarMensaje,
} from "./server/mensajes.js";

// Creación de tablas de no existir
await crearProductos();
await crearMensajes();

// Express
import express from "express";
const app = express();
app.use(express.static("./public"));
app.get("/", (_req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

// Socket io
import keys from "./src/ws_keys.js";
import { createServer } from "http";
const httpServer = createServer(app);
import { Server } from "socket.io";
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log(`Nuevo cliente conectado en socket: ${socket.id}`);
  verMensajes().then((mensajes) => {
    socket.emit(keys.nuevoMensaje, mensajes);
  });
  mostrarProductos().then((productos) =>
    socket.emit(keys.nuevoProducto, productos)
  );
  socket.on(keys.cargarProducto, (datos) => {
    cargarProducto(datos).then(() => {
      mostrarProductos().then((productos) =>
        socket.emit(keys.nuevoProducto, productos)
      );
    });
  });
  socket.on(keys.enviarMensaje, (msj) => {
    agregarMensaje(msj).then(() => {
      verMensajes().then((mensajes) =>
        socket.emit(keys.nuevoMensaje, mensajes)
      );
    });
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
