import knexLib from "knex";
class SqlMensajes {
  constructor(config) {
    this.knex = knexLib(config);
  }

  async crearTabla(datos) {
    const exists = await this.knex.schema.hasTable("mensajes");
    if (!exists) {
      return this.knex.schema
        .createTable("mensajes", (table) => {
          table.increments("id").primary();
          table.string("email", 25).notNullable();
          table.string("msj", 500).notNullable();
          table.dateTime("date");
        })
        .then(() => {
          return this.cargarMensaje(datos);
        });
    } else {
      return false;
    }
  }

  cargarMensaje(mensaje) {
    return this.knex("mensajes").insert(mensaje);
  }

  listarMensajes() {
    return this.knex("mensajes").select("*");
  }
}

export default SqlMensajes;
