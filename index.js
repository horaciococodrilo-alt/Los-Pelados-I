import {
  seleccionarCantidadGustos,
  ingresarCliente,
  seleccionarProducto,
  seleccionarSabores,
} from "./dataEntry.js";

import fs from "fs";

let sabores = JSON.parse(fs.readFileSync("./data/sabores.json", "utf8"));
let productos = JSON.parse(fs.readFileSync("./data/productos.json", "utf8"));
let cliente = ingresarCliente();
let producto = seleccionarProducto(productos);
let gustos = seleccionarCantidadGustos(producto.maxGustos);
let saboresElegidos = seleccionarSabores(sabores, gustos);

let nuevoPedido = {
  cliente: cliente,
  producto: producto.nombre,
  sabores: saboresElegidos,
};

let pedidos = [];
try {
  const pedidosJSON = fs.readFileSync("./data/pedidos.json", "utf8");
  pedidos = JSON.parse(pedidosJSON);
  if (!Array.isArray(pedidos)) {
    pedidos = [];
  }
} catch (error) {
  pedidos = [];
}

pedidos.push(nuevoPedido);

fs.writeFileSync("./data/pedidos.json", JSON.stringify(pedidos, null, 2), "utf8");
