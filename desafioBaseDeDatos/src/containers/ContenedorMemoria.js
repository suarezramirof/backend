class ContenedorMemoria {
  constructor(items = []) {
    this.items = items;
  }

  getAll() {
    return this.items;
  }

  get(id) {
    const [item] = this.items.map((elem) => elem.id == id);
    return item;
  }

  add(item) {
    this.items.push(item);
  }

  update(data, id) {
    const [item] = this.items.map((elem) => elem.id == id);
    item = { ...item, ...data };
  }

  delete(id) {
    this.items = this.items.filter((elem) => elem.id != id);
  }
}

export default ContenedorMemoria;
