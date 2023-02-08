import controladorMensajes from "./src/controllers/controladorMensajes.js";
import { routerProductos } from "./src/routes/RouterProductos.js";
import keys from "./src/ws_keys.js";

// Express
import express from "express";
const app = express();
app.use(express.static("./public"));
app.get("/", (_req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.use("/api", routerProductos);

// Socket io
import { createServer } from "http";
const httpServer = createServer(app);
import { Server } from "socket.io";
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log(`Nuevo cliente conectado en socket: ${socket.id}`);
  controladorMensajes.verMensajes(socket);
  socket.emit(keys.nuevoProducto);
  socket.on(keys.enviarMensaje, (msj) =>
    controladorMensajes.cargarMensaje(msj, io)
  );
});

// Servidor
const PORT = 8080;
const server = httpServer.listen(PORT, () => {
  console.log(`Servidor listo en el puerto ${server.address().port}`);
});
server.on("error", (error) => {
  console.log(`Error en el servidor: ${error}`);
});

export default io;
