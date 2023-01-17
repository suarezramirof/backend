import SqlProducts from "../src/apiProductos.js";
import { mariaDB } from "../options/options.js";

const productos = new SqlProducts(mariaDB);

import { sampleProducts } from "../src/sample.js";

export async function crearProductos() {
  try {
        const res = await productos
            .crearTabla(sampleProducts);
        if (res) {
            console.log("Productos de ejemplo cargados");
        }
    } catch (error) {
        console.log(error);
    }
}

export function mostrarProductos() {
  return productos.listarProductos().catch((error) => console.log(error));
}

export function cargarProducto(producto) {
  return productos
    .agregarProducto(producto)
    .then(() => console.log("Producto agregado con éxito"))
    .catch((error) => console.log(error));
}
