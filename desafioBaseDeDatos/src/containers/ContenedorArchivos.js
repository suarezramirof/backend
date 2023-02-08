import fs from "fs/promises";

class ContenedorArchivos {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async getAll() {
    const items = await fs.readFile(this.ruta, "utf-8");
    return JSON.parse(items);
  }

  async get(id) {
    const [item] = await this.getAll().map((elem) => elem.id == id);
    return item;
  }

  async add(item) {
    const items = await this.getAll();
    items.push({...item, id: items.length});
    await this.updateAll(items);
  }

  async updateAll(data) {
    await fs.writeFile(this.ruta, JSON.stringify(data), "utf-8");
  }

  async update(data, id) {
    // const [item] = this.items.map((elem) => elem.id == id);
    // item = { ...item, ...data };
    // await this.updateAll()
  }

  async delete(id) {
    const items = await this.getAll();
    const newItems = items.filter((elem) => elem.id != id);
    this.updateAll(newItems);
  }
}

export default ContenedorArchivos;
