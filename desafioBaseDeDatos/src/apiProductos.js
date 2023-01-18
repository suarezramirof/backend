import knexLib from "knex";
class SqlProducts {
  constructor(config) {
    this.knex = knexLib(config);
  }

  listarProductos() {
    return this.knex("productos").select("*");
  }

  async crearTabla(sample) {
    const exists = await this.knex.schema.hasTable("productos");
    if (!exists) {
      return this.knex.schema
        .createTable("productos", (table) => {
          table.increments("id").primary();
          table.string("nombre", 15).notNullable();
          table.string("foto", 100).notNullable();
          table.float("precio");
        })
        .then(() => {
          return this.agregarProducto(sample);
        });
    } else {
      return false;
    }
  }

  agregarProducto(producto) {
    return this.knex("productos").insert(producto);
  }
}

export default SqlProducts;
