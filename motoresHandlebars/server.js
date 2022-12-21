const Contenedor = require("./contenedor.js"); // Clase
let productos = require("./productos.json"); // Array inicial de ejemplo

const products = new Contenedor(productos);

// Express

const express = require("express");
const app = express();

const { create } = require("express-handlebars");

const hbs = create({
  extname: ".hbs",
  defaultLayout: "index.hbs",
  layoutsDir: __dirname + "/views/layouts",
  partialsDir: __dirname + "/views/partials",
});
app.engine("hbs", hbs.engine);

app.set("view engine", "hbs");

app.set("views", "./views");
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

// Rutas

app.get("/productos", (_req, res) => {
  try {
    res.render("main", { productos: products.getAll() });
  } catch (error) {
    res.status(error.code ? error.code : 500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.render("form")
})

app.post("/productos", (req, res) => {
  try {
    const producto = req.body;
    products.addItem(producto);
    res.redirect("/productos");
  } catch (error) {
    res.status(error.code ? error.code : 500).json({ error: error.message });
  }
});


// productosRouter.get("/:id", (req, res) => {
//   try {
//     const { id } = req.params;
//     res.json(products.getItemById(id));
//   } catch (error) {
//     res.status(error.code ? error.code : 500).json({ error: error.message });
//   }
// });

// productosRouter.put("/:id", (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, price, thumbnail } = req.body;
//     res.json(products.updateItem(id, { title, price, thumbnail }));
//   } catch (error) {
//     res.status(error.code ? error.code : 500).json({ error: error.message });
//   }
// });

// productosRouter.delete("/:id", (req, res) => {
//   try {
//     const { id } = req.params;
//     res.json(products.deleteItemById(id));
//   } catch (error) {
//     res.status(error.code ? error.code : 500).json({ error: error.message });
//   }
// }
// );

