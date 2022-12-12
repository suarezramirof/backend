const Contenedor = require("./contenedor.js"); // Clase
let productos = require("./productos.json"); // Array inicial de ejemplo

const products = new Contenedor(productos);

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

// Rutas

productosRouter.get("/", (_req, res) => {
  try {
    res.json(products.getAll());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

productosRouter.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    res.json(products.getItemById(id));
  } catch (error) {
    res.status(error.code ? error.code : 500).json({ error: error.message });
  }
});

productosRouter.post("/", (req, res) => {
  try {
    const producto = req.body;
    res.json(products.addItem(producto));
  } catch (error) {
    res.status(error.code ? error.code : 500).json({ error: error.message });
  }
});

productosRouter.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;
    res.json(products.updateItem(id, { title, price, thumbnail }));
  } catch (error) {
    res.status(error.code ? error.code : 500).json({ error: error.message });
  }
});

productosRouter.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    res.json(products.deleteItemById(id));
  } catch (error) {
    res.status(error.code ? error.code : 500).json({ error: error.message });
  }
});
