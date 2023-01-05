class Contenedor {
  constructor(productos) {
    this.productos = productos;
  }

  getAll() {
    return this.productos;
  }

  // getItemById = (id) => {
  //   const [item] = this.productos.filter((elem) => elem.id == id);
  //   if (item) return item;
  //   else if (isNaN(id)) {
  //     const error = new Error("El id ingresado no es válido");
  //     error.code = 400;
  //     throw error;
  //   } else {
  //     const error = new Error("Producto no encontrado");
  //     error.code = 404;
  //     throw error;
  //   }
  // };

  addItem = (producto) => {
    if (producto.title && producto.price && producto.thumbnail) {
      let idMax = 0;
      for (let item of this.productos) {
        if (item.id > idMax) {
          idMax = item.id;
        }
      }
      const newId = idMax + 1;
      this.productos.push({ ...producto, id: newId });
      return { ...producto, id: newId };
    } else {
      const error = new Error("Ingrese todos los datos del producto");
      error.code = 400;
      throw error;
    }
  };

  // updateItem = (id, { title, price, thumbnail }) => {
  //   if (!isNaN(id)) {
  //     let idValido = false;
  //     for (let item of this.productos) {
  //       if (Object.values(item).includes(parseInt(id))) {
  //         idValido = true;
  //       }
  //     }
  //     if (!idValido) {
  //       const error = new Error("Producto no encontrado");
  //       error.code = 404;
  //       throw error;
  //     }
  //     this.productos = this.productos.map((item) =>
  //       item.id == id
  //         ? {
  //             title: title ? title : item.title,
  //             price: price ? price : item.price,
  //             thumbnail: thumbnail ? thumbnail : item.thumbnail,
  //             id,
  //           }
  //         : item
  //     );
  //     return this.productos.filter((item) => item.id == id);
  //   } else {
  //     const error = new Error("Ingrese un id válido");
  //     error.code = 400;
  //     throw error;
  //   }
  // };

  // deleteItemById = (id) => {
  //   if (!isNaN(id)) {
  //     if (this.productos.map((item) => item.id).includes(parseInt(id))) {
  //       this.productos = this.productos.filter((item) => item.id != id);
  //       return this.productos;
  //     } else {
  //       const error = new Error("Producto no encontrado");
  //       error.code = 404;
  //       throw error;
  //     }
  //   } else {
  //     const error = new Error("Ingrese un id válido");
  //     error.code = 400;
  //     throw error;
  //   }
  // };
}

module.exports = Contenedor;
