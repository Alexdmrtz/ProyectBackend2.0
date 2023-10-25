import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import productRouter from './src/routers/productRouter.js';
import cartRouter from './src/routers/cartRouter.js';

const app = express();
const port = 8080;

app.use(express.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use('/products', productRouter);
app.use('/carts', cartRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});




