import { productos } from "../daos/index.js";

class ControladorProductos {
  constructor(productos) {
    this.productos = productos;
  }

  getSampleProducts = (_req, res) => {
    try {
      res.json(this.productos.getSample());
    } catch (error) {
      console.log(error);
    }
  };
}

const controladorProductos = new ControladorProductos(productos);

export default controladorProductos;
