import { mensajes } from "../daos/index.js";
import {normalize, schema} from "normalizr";
import keys from "../ws_keys.js";
const user = new schema.Entity("author");
const schemaMensajes = new schema.Entity("mensajes", { author: user });
class ControladorMensajes {
  constructor(mensajes) {
    this.mensajes = mensajes;
  }

  normalizar = (data) => {
    return normalize(data, [schemaMensajes])
  }

  cargarMensaje = async (msj, io) => {
    await this.mensajes.add(msj);
    const mensajes = await this.mensajes.getAll();
    const mensajesNormalizados = this.normalizar(mensajes);
    io.sockets.emit(keys.nuevoMensaje, mensajesNormalizados)
  };

  verMensajes = async (socket) => {
    const mensajes = await this.mensajes.getAll();
    const mensajesNormalizados = this.normalizar(mensajes);
    socket.emit(keys.nuevoMensaje, mensajesNormalizados);
  };
}

const controladorMensajes = new ControladorMensajes(mensajes);

export default controladorMensajes;
