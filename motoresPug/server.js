const Contenedor = require("./contenedor.js"); // Clase
let productos = require("./productos.json"); // Array inicial de ejemplo

const products = new Contenedor(productos);

// Express

const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Pug
app.set("view engine", "pug");
app.set("views", "./views");

// Servidor

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor listo en el puerto ${server.address().port}`);
});
server.on("error", (error) => {
  console.log(`Error en el servidor: ${error}`);
});

// Rutas

app.get("/productos", (_req, res) => {
  try {
    res.render("productos", { productos: products.getAll() });
  } catch (error) {
    res.status(error.code ? error.code : 500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.render("form");
});

app.post("/productos", (req, res) => {
  try {
    const producto = req.body;
    products.addItem(producto);
    res.redirect("/productos");
  } catch (error) {
    res.status(error.code ? error.code : 500).json({ error: error.message });
  }
});

