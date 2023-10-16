import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import ProductManager from './productmanager.js';

const app = express();
const port = 8080;

app.use(express.json());

// Obtén la ruta del directorio actual y úsala para construir la ruta del archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const productManager = new ProductManager(join(__dirname, 'productos.json'));

app.get('/products', async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const products = await productManager.getProducts(limit);
  res.json(products);
});

app.get('/products/:id', async (req, res) => {
  const productId = parseInt(req.params.id);
  const product = await productManager.getProductById(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});



