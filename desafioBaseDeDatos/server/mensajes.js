import SqlMensajes from "../src/apiMensajes.js";
import { sqlite3 } from "../options/options.js";
import { sampleMessages } from "../src/sample.js";

const mensajes = new SqlMensajes(sqlite3);

export async function crearMensajes() {
  try {
    const res = await mensajes.crearTabla(sampleMessages);
    if (res) console.log("Mensajes de ejemplo cargados");
    else console.log("Tabla con mensajes existente");
  } catch (error) {
    return console.log(error);
  }
}

export function agregarMensaje(mensaje) {
  return mensajes
    .cargarMensaje(mensaje)
    .then(() => {
      console.log("Mensaje agregado con éxito");
    })
    .catch((error) => console.log(error));
}

export function verMensajes() {
  return mensajes.listarMensajes().catch((error) => console.log(error));
}
