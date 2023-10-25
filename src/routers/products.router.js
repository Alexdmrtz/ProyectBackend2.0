import express from 'express';
import ProductManager from '../controllers/productmanager.js';
import { uploader } from '../utils.js';

const router = express.Router();
const productManager = new ProductManager();

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const products = await productManager.getProducts(limit);
    res.json(products);
  } catch (err) {
    res.status(500).send("Error al obtener los productos: " + err);
  }
});

// Ruta para obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await productManager.getProductById(id);
    res.json(product || 'Producto no encontrado');
  } catch (err) {
    res.status(500).send("Error al obtener el producto: " + err);
  }
});

// Ruta para agregar un nuevo producto
router.post('/', uploader.single('thumbnail'), async (req, res) => {
  try {
    if (!req.file) {
      res.status(500).send("No subiste la imagen");
    }

    const data = req.body;
    const filename = req.file.filename;
    data.thumbnail = `http://localhost:8080/images/${filename}`;

    const product = await productManager.addProduct(data);
    res.send(product);
  } catch (err) {
    res.status(500).send("Error al cargar el producto: " + err);
  }
});

// Ruta para actualizar un producto por ID
router.put('/:id', uploader.single('thumbnail'), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;

    if (req.file) {
      const filename = req.file.filename;
      data.thumbnail = `http://localhost:8080/images/${filename}`;
    }

    const product = await productManager.updateProduct(id, data);
    res.send(product);
  } catch (err) {
    res.status(500).send("Error al querer upgradear el producto: " + err);
  }
});

// Ruta para eliminar un producto por ID
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const productEliminated = await productManager.deleteProduct(id);
    res.send(productEliminated);
  } catch (err) {
    res.status(500).send("Error al querer eliminar el producto: " + err);
  }
});

export default router;