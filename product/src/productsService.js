// Import the necessary dependencies
const lodash = require("lodash");
const productsList = require("./products.json").products;


const getProducts = () => {
  // get all products
  return JSON.stringify(productsList)
}

const getProductsById = (productId, done) => {
  let product = null

  // get a product by ID
  product = productsList.find(product => product.id === productId);
  if (!product) {
    return done("Requested product doesn't exist..!", null);
  }
  return done(null, JSON.stringify(product));
}

const saveProduct = (newProduct, done) => {
  // save a product
  const existingProduct = productsList.find(product => product.name === newProduct.name);
  
  if (existingProduct) {
    return done("Product already exists..!", null);
  }

  // Generate a new product ID
  const nextProductId = lodash.maxBy(productsList, "id").id + 1;
  newProduct.id = nextProductId;
  
  // Add the new product to the list
  productsList.push(newProduct)
  return done(null, JSON.stringify(productsList));
}

const updateProduct = (productId, updateData, done) => {
  let updatedProductList = null;
  // update the product list
  const productIndex = productsList.findIndex(product => product.id === productId);

  if (productIndex === -1) {
    return done("Requested product doesn't exist..!", null);
  }

  // Create a shallow copy of the products list
  updatedProductList = productsList;
  
  // Update the product properties
  updatedProductList[productIndex] = { ...updatedProductList[productIndex], ...updateData };

  return done(null, JSON.stringify(updatedProductList));
}

const deleteProduct = (productId, done) => {
  // delete a product    
  const updatedProductList = productsList.filter(product => product.id !== productId);
  if (updatedProductList.length === productsList.length) {
    return done("Requested product doesn't exist..!", null);
  }
  return done(null, JSON.stringify(updatedProductList));
}


module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct
}


