import express from 'express';
import controladorProductos from '../controllers/controladorProductos.js';

export const routerProductos = express.Router();

routerProductos.get("/productos-test", controladorProductos.getSampleProducts);