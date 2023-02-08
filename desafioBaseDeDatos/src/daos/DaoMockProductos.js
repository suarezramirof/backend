import ContenedorMemoria from "../containers/ContenedorMemoria.js";
import { generarProducto } from "../utils/generadorProductos.js";
class DaoMockProductos extends ContenedorMemoria {
  constructor() {
    super();
  }

  getSample() {
    const sample = [];
    for (let i = 0; i < 5; i++) {
      sample.push(generarProducto());
    }
    return sample;
  }
}

export default DaoMockProductos;