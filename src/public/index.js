const socket = io();

socket.on('productUpdate', (product) => {
  // Actualizar la interfaz de usuario con el nuevo producto recibido
  // Por ejemplo, agregar el nuevo producto a la lista de productos en la página
});