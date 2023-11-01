import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import exphbs from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';
import productRouter from './src/routers/productRouter.js';
import cartRouter from './src/routers/cartRouter.js';

const app = express();
const port = 8080;

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configurar Handlebars como el motor de plantillas
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Servir archivos estáticos
app.use(express.static(join(__dirname, 'public')));

// Rutas existentes
app.use('/products', productRouter);
app.use('/carts', cartRouter);

// Crear el servidor HTTP y vincular Socket.io
const server = http.createServer(app);
const io = new Server(server);

// Manejar las conexiones de Socket.io
io.on('connection', (socket) => {
  console.log('New connection:', socket.id);

  socket.on('newProduct', (product) => {
    // Lógica para manejar la adición de un nuevo producto
    // Aquí se debería enviar la actualización a todos los clientes conectados
    io.emit('productUpdate', product);
  });
});

server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});




