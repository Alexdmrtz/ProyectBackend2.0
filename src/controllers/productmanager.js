import fs from 'fs/promises';

class ProductManager {
  constructor(filePath) {
    this.products = [];
    this.productIdCounter = 1;
    this.path = filePath;
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data);
      console.log('Productos cargados:', this.products);
      if (this.products.length > 0) {
        const lastProduct = this.products[this.products.length - 1];
        this.productIdCounter = lastProduct.id + 1;
      }
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  }

  async saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    await fs.writeFile(this.path, data, 'utf-8');
  }

  async getProducts(limit) {
    if (limit) {
      return this.products.slice(0, limit);
    }
    return this.products;
  }

  async getProductById(id) {
    const product = this.products.find(product => product.id === id);
    return product || null;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error('Todos los campos son obligatorios');
      return;
    }

    if (this.products.some(product => product.code === code)) {
      console.error('El código de producto ya está en uso');
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
    await this.saveProducts();
    console.log('Producto agregado:', product);
  }

  async updateProductById(id, newData) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...newData };
      await this.saveProducts();
      console.log('Producto modificado:', this.products[index]);
    } else {
      console.error('Producto no encontrado');
    }
  }

  async deleteProductById(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1)[0];
      await this.saveProducts();
      console.log('Producto eliminado:', deletedProduct);
    } else {
      console.error('Producto no encontrado');
    }
  }
}

export default ProductManager;

