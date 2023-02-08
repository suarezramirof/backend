import { faker } from "@faker-js/faker";

faker.locale = "es";

export function generarProducto() {
  return {
    nombre: faker.commerce.product(),
    precio: faker.commerce.price(),
    foto: faker.image.cats(128, 128, true),
  };
}
