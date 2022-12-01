const fs = require("fs");

class Contenedor {
  constructor(nombre) {
    this.archivo = nombre;
  }

  async getAll() {
    try {
      const array = JSON.parse(
        await fs.promises.readFile(this.archivo, "utf-8")
      );
      return array;
    } catch {
      return [];
    }
  }

  async getById(id) {
    try {
      const arr = await this.getAll();
      const obj = arr.filter((elem) => elem.id == id);
      return obj.length ? obj[0] : null;
    } catch {
      return null;
    }
  }

  async write(array, objeto, id) {
    try {
      if (objeto) {
        array.push({ ...objeto, id: id });
      }
      await fs.promises.writeFile(this.archivo, JSON.stringify(array, null, 2));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async save(objeto) {
    try {
      const array = await this.getAll();
      let idMax = 0;
      for (let obj of array) {
        if (obj.id > idMax) {
          idMax = obj.id;
        }
      }
      const newId = idMax + 1;
      await this.write(array, objeto, idMax + 1);
      return newId;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteById(id) {
    try {
      const array = await this.getAll();
      const newArray = array.filter((item) => item.id != id);
      await this.write(newArray);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteAll() {
    try {
      this.write([]);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const rndArray = (array) => {
  return 1 + parseInt(Math.random() * array.length);
};
const productos = new Contenedor("productos.txt");

const express = require("express");

const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchado en el puerto ${server.address().port}`);
});

app.get("/productos", (req, res) => {
  productos.getAll().then((array) => res.send(array));
});

app.get("/productoRandom", (req, res) => {
  let index = productos.getAll().then((array) => rndArray(array));
  index.then((ind) => productos.getById(ind).then((item) => res.send(item)));
});

server.on("error", (error) => console.log(error));
