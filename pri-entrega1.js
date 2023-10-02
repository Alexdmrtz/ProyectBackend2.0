class ProductManager {
    constructor() {
      this.products = [];
      this.productIdCounter = 1;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      // Validamos que todos los campos sean obligatorios
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error("Todos los campos son obligatorios");
        return;
      }
  
      // Validamos que el campo "code" no esté repetido
      if (this.products.some(product => product.code === code)) {
        console.error("El código de producto ya está en uso");
        return;
      }
  
      // Agregamos el producto con un id autoincrementable
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
  }
  
  // TESTING DEL CODIGO
  
  const productManager = new ProductManager();
  console.log("Productos iniciales:", productManager.getProducts()); // tiene que mostrar: "Productos iniciales: []"
  
  productManager.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  );
  
  console.log("Productos después de agregar uno:", productManager.getProducts()); // tiene que mostrar información sobre el producto agregado
  
  // Intentamos agregar un producto con el mismo código
  productManager.addProduct(
    "producto repetido",
    "Este es un producto repetido",
    150,
    "Sin imagen",
    "abc123",
    10
  ); // Debería mostrar un mensaje de error "El código de producto ya está en uso"
  
  // Buscar un producto por ID
  const foundProduct = productManager.getProductById(1);
  console.log("Producto encontrado por ID:", foundProduct); // tiene que mostrar información sobre el producto encontrado
  
  // Intentar buscar un producto inexistente por ID
  const notFoundProduct = productManager.getProductById(99);  // tiene que mostrar un mensaje de error "Producto no encontrado"