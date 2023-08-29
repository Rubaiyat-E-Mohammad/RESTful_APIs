//Import the necessary dependencies
const http = require('http')
// Define a prot at which the server will run
const PORT = 3000

const productsService = require("./productsService");
const getRequestData = require('./utils');

const server = http.createServer(async (req, res) => {
  // Get all products
  if(req.url === "/products" && req.method === "GET"){
    const getAllProducts = productsService.getProducts()
    res.writeHead(200, {"content-type":"application/json"})
    //send the data
    res.end(JSON.stringify(getAllProducts))
  }
  // Get a product with specified id
  if(req.url.match(/\/products\/([0-9]+)/) && req.method === "GET"){
    const productId = parseInt(req.url.split("/")[2])
    productsService.getProductsById(productId, (err, product) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Requested product doesn't exist..!");
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(product));
      }
    })
  }
  // Create a new product
  if(req.url === "/products" && req.method === "POST"){
    let request_body = await getRequestData(req)
    let newProduct = JSON.parse(request_body)
    productsService.saveProduct(newProduct, (err, updatedProducts) => {
      if (err) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Product already exists..!");
      } else {
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(updatedProducts));
      }
    })
  }
  // Update a specific product
  if (req.url.match(/\/products\/([0-9]+)/) && req.method === "PUT"){
    //get the id from url
    const id = request.url.split("/")[2]
    const requestData = await getRequestData(req)
    const updateData = JSON.parseInt(requestData)
    productsService.updateData(id, updateData, (err, updatedProducts)=>{
      if(err){
        res.writeHead(404, {"content-type":"application/json"})
        res.end('No PRODUCT with id present')
    } else{
        response.writeHead(404, {"content-type":"application/json"})
        response.end(JSON.stringify(updatedProducts))
    }
    })
}
  // Delete a specific Product
  if (req.method === "DELETE" && req.url.startsWith("/products/")) {
    const productId = parseInt(req.url.split("/")[2]);
    productsService.deleteProduct(productId, (err, updatedProducts) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Requested product doesn't exist..!");
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(updatedProducts));
      }
    })
  }

});

// listen for client requests
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
})
server.on('error', (error)=>{
	if(error.code === 'EADRINUSE'){
		console.log('Port already in use')
	}
})


