//import fs module
const fs = require('fs')

//The getProducts function take done as callback
//It will read the product.json file

const getProducts = function(done){
  fs.readFile('src/products.json', (err, fileContent)=>{
    if(err){
        return done("Encountered error")
    }
    let productData = JSON.parse(fileContent)
    return done(undefined, productData)
})

//parse the filecontent and save it in another varible say productdata
//return the callback with first parameter as undefined and second parameter as productdata
       
}


//The function getProductById will take two parameters first the id and second the callback
//It will read the product.json file
const getProductById = function(id,done){
    //write all the logical steps
    //return the callback with first parameter as undefined and second parameter as productDetails
      fs.readFile('src/products.json', (err, fileContent)=>{
        if(err){
          return done("Encountered error")
        }
        let productData = JSON.parse(fileContent)
        const productDetails = productData.find(product=> product.id === parseInt(id))
        if(!productDetails){
          return done("No product found")
        }
        return done(undefined, productDetails)
      })
}


//The saveProductDetails method will take productDetails and done as callback
//It will read the product.json file
const saveProductDetails = function (ProductDetails, done) {
  //write all the logical steps
  //parse the filecontent and save it in another varible say productdata
  //push the productDetails in the productData
      
  //Write the productData into the file 
     
  //return the callback with undefined and ProductDetails
  fs.readFile('src/products.json', (err, fileContent)=>{
    if(err){
      return done("Encountered error")
    }
    let productData = JSON.parse(fileContent)
    const newId = productData.length + 1
    ProductDetails.id = newId
    productData.push(ProductDetails)
    fs.writeFile('src/products.json', JSON.stringify(productData),(err, updatedContent)=>{
      if(err){
          return done("updating error")
      }
      return done(undefined, ProductDetails)
  })
  })
    
  }

  //The method deleteProductById will take productId and done as parameters
  //It will read the product.json file

  const deleteProductById = function(productId, done){
    //Write all the logical steps
     //return the callback with first parameter as undefined and second parameter as productDetails
     fs.readFile('src/products.json', (err, fileContent)=>{
      if(err){
        return done("Encountered error")
      }
      let productData = JSON.parse(fileContent)
      const productDetails = productData.filter(product=> product.id != productId)
      fs.writeFile('src/products.json', JSON.stringify(productDetails),(err, updatedContent)=>{
        if(err){
            return done("updating error")
        }
        return done(null, productDetails)
    })
    })
  }


module.exports ={
    getProducts,
    getProductById,
    saveProductDetails,
    deleteProductById
    
}