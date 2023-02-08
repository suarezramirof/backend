import ContenedorArchivos from "../containers/ContenedorArchivos.js";

class DaoMensajesArchivos extends ContenedorArchivos {
  constructor() {
    super("./DB/mensajes.json");
  }
}

export default DaoMensajesArchivos;