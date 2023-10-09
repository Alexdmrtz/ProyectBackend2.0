const fs = require('fs'); // Importamos el módulo 'fs' para manejar archivos

class ProductManager {
  constructor(filePath) {
    this.products = [];
    this.productIdCounter = 1;
    this.path = filePath; // Agregamos la propiedad 'path' para manejar la ruta del archivo
    this.loadProducts(); // Cargamos productos existentes al inicializar la instancia
  }

  // Método para cargar productos desde el archivo
  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data);
      // Si hay productos, actualizamos el contador de ID
      if (this.products.length > 0) {
        const lastProduct = this.products[this.products.length - 1];
        this.productIdCounter = lastProduct.id + 1;
      }
    } catch (error) {
      // Si hay un error al leer el archivo, asumimos que es porque no existe, lo manejaremos al guardar
    }
  }

  // Método para guardar productos en el archivo
  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data, 'utf-8');
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    if (this.products.some(product => product.code === code)) {
      console.error("El código de producto ya está en uso");
      return;
    }

    const product = {
      id: this.productIdCounter++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(product);
    this.saveProducts(); // Guardamos productos después de agregar uno
    console.log("Producto agregado:", product);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (product) {
      return product;
    } else {
      console.error("Producto no encontrado");
      return null;
    }
  }

  // Método para modificar un producto por ID
  updateProductById(id, newData) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...newData };
      this.saveProducts(); // Guardamos productos después de modificar uno
      console.log("Producto modificado:", this.products[index]);
    } else {
      console.error("Producto no encontrado");
    }
  }

  // Método para eliminar un producto por ID
  deleteProductById(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1)[0];
      this.saveProducts(); // Guardamos productos después de eliminar uno
      console.log("Producto eliminado:", deletedProduct);
    } else {
      console.error("Producto no encontrado");
    }
  }
}

// TESTING DEL CODIGO
const productManager = new ProductManager('productos.json');
console.log("Productos iniciales:", productManager.getProducts());

productManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

console.log("Productos después de agregar uno:", productManager.getProducts());

productManager.addProduct(
  "producto repetido",
  "Este es un producto repetido",
  150,
  "Sin imagen",
  "abc123",
  10
);

const foundProduct = productManager.getProductById(1);
console.log("Producto encontrado por ID:", foundProduct);

productManager.updateProductById(1, { price: 250, stock: 30 });

productManager.deleteProductById(2);

console.log("Productos finales:", productManager.getProducts());
