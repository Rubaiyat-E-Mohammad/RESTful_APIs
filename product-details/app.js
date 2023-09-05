const express = require('express')
const path = require('path')
const config = require("./config")
const app = express()
const productsRouter = require("./src")
const oauthRouter = require('./oauth')
const LoggerMiddleware = (req, res, next) => {
  console.log(`Logged ${req.url} ${req.method}`)
  next()
}
app.use(express.static('static'))
app.use(LoggerMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/',(req,res)=>{
  return res.sendFile(path.join(__dirname,'./static/index.html'))
})
app.use('/oauth',oauthRouter)

app.use("/products",oauthRouter, productsRouter)
app.use((req, res, next) => {
  return res.status(404).send('Resource not found')
});

const server = app.listen(config.PORT, () => {
  console.log('Listening on port', config.PORT)
});

module.exports = server;
