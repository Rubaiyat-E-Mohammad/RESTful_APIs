const fs = require('fs')


const p = 'T46888468'
const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://rubaiyatemohammad:${p}@rubaiyatemohammad.xkea72m.mongodb.net/productsDetails?retryWrites=true&w=majority`)
  .then(() => console.log("db is connected"))
  .catch((err) => console.log(err))
const productsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  price: Number,
  quantity: Number
})
const Product = mongoose.model("products", productsSchema)


const getProducts = function (done) {
  fs.readFile('src/products.json', (err, fileContent) => {
    if (err) {
      return done("Encountered error")
    }
    let productData = JSON.parse(fileContent)
    return done(undefined, productData)
  })
}

const getProductById = function (id, done) {
  fs.readFile('src/products.json', (err, fileContent) => {
    if (err) {
      return done("Encountered error")
    }
    let productData = JSON.parse(fileContent)
    const productDetails = productData.find(product => product.id === parseInt(id))
    if (!productDetails) {
      return done("No product found")
    }
    return done(undefined, productDetails)
  })
}

const saveProductDetails = function (ProductDetails, done) {
  fs.readFile('src/products.json', (err, fileContent) => {
    if (err) {
      return done("Encountered error")
    }
    let productData = JSON.parse(fileContent)
    const newId = productData.length + 1
    addedId = newId
    ProductDetails.id = newId
    productData.push(ProductDetails)
    fs.writeFile('src/products.json', JSON.stringify(productData), (err, updatedContent) => {
      if (err) {
        return done("updating error")
      }
    })
    const newProduct = new Product(ProductDetails);

    newProduct.save()
      .then((savedProduct) => {
        return done(null, savedProduct)
      })
      .catch((err) => {
        return done(err)
      })
  })

}

const deleteProductById = function (productId, done) {
  fs.readFile('src/products.json', (err, fileContent) => {
    if (err) {
      return done("Encountered error")
    }
    let productData = JSON.parse(fileContent)
    const productDetails = productData.filter(product => product.id != productId)
    fs.writeFile('src/products.json', JSON.stringify(productDetails), (err, updatedContent) => {
      if (err) {
        return done("updating error")
      }
      return done(null, productDetails)
    })
  })
}


module.exports = {
  getProducts,
  getProductById,
  saveProductDetails,
  deleteProductById
}