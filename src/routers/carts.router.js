import express from 'express';
import { CartManager } from '../managers/cartManager.js';

const router = express.Router();
const cartManager = new CartManager();

// Ruta para obtener todos los carritos
router.get('/', async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.send(carts);
  } catch (err) {
    res.status(500).send("Error al obtener los carritos: " + err);
  }
});

// Ruta para obtener un carrito por ID
router.get('/:cid', async (req, res) => {
  const id = parseInt(req.params.cid);
  const cart = await cartManager.getCartById(id);
  res.send(cart || 'Carrito no encontrado');
});

// Ruta para crear un nuevo carrito
router.post('/', async (req, res) => {
  try {
    const cart = await cartManager.createCart();
    res.send(cart);
  } catch (err) {
    res.status(500).send("Error al crear el carrito: " + err);
  }
});

// Ruta para agregar un producto a un carrito
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const product = await cartManager.addProductInCart(cid, pid);
    res.send(product);
  } catch (err) {
    res.status(500).send("Error al agregar producto al carrito: " + err);
  }
});

export default router;
