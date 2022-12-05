// Express

const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servidor

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor listo en el puerto ${server.address().port}`);
});
server.on("error", (error) => {
  console.log(`Error en el servidor: ${error}`);
});

// Router

const productosRouter = express.Router();
app.use("/api/productos", productosRouter);

// Array

let productos = [
  {
    title: "Globo terráqueo",
    price: 200,
    thumbnail: "https://www.fillmurray.com/640/360",
    id: 1,
  },
  {
    title: "Escuadra",
    price: 50,
    thumbnail: "https://www.fillmurray.com/640/358",
    id: 2,
  },
  {
    title: "Calculadora",
    price: 150,
    thumbnail: "https://www.fillmurray.com/638/360",
    id: 3,
  },
];

// Contenedor

class Contenedor {
  constructor(productos) {
    this.productos = productos;
  }

  getAll() {
    try {
      return this.productos;
    } catch {
      throw new Error("Error del servidor");
    }
  }

  getItemById = (id) => {
    if (isNaN(id)) {
      throw new Error("Ingrese un id numérico");
    }
    try {
      const [item] = this.productos.filter((elem) => elem.id == id);
      if (!item) {
        return { error: "producto no encontrado" };
      }
      return item;
    } catch {
      throw new Error("Error en el servidor");
    }
  };

  addItem = (producto) => {
    if (!producto.title || !producto.price || !producto.thumbnail) {
      throw new Error("Ingrese los datos del producto correctamente");
    }
    try {
      let idMax = 0;
      for (let item of productos) {
        if (item.id > idMax) {
          idMax = item.id;
        }
      }
      const newId = idMax + 1;
      productos.push({ ...producto, id: newId });
      return { ...producto, id: newId };
    } catch {
      throw new Error("Error al agregar producto");
    }
  };

  updateItem = (id, { title, price, thumbnail }) => {
    if (isNaN(id)) {
      throw new Error("Ingrese un id numérico");
    }
    let idValido = false;
    for (let item of productos) {
      if (Object.values(item).includes(parseInt(id))) {
        idValido = true;
      }
    }
    if (!idValido) {
      return { error: "producto no encontrado" };
    }
    try {
      productos = productos.map((item) =>
        item.id == id
          ? {
              title: title ? title : item.title,
              price: price ? price : item.price,
              thumbnail: thumbnail ? thumbnail : item.thumbnail,
              id,
            }
          : item
      );
      return productos.filter((item) => item.id == id);
    } catch {
      throw new Error("Error al actualizar el producto");
    }
  };

  deleteItemById = (id) => {
    if (isNaN(id)) {
      throw new Error("Ingrese un id númerico");
    }
    if (!productos.filter((elem) => elem.id == id)[0]) {
      return { error: "producto no encontrado" };
    }
    productos = productos.filter((item) => item.id != id);
    return productos;
  };
}



const products = new Contenedor(productos);
// API

productosRouter.get("/", (_req, res) => {
  res.json(products.getAll());
});

productosRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json(products.getItemById(id));
});

productosRouter.post("/", (req, res) => {
  const producto = req.body;
  res.json(products.addItem(producto));
});

productosRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, thumbnail } = req.body;
  res.json(products.updateItem(id, { title, price, thumbnail }));
});

productosRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.json(products.deleteItemById(id));
});
