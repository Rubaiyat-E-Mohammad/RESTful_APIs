const express = require('express')
const path = require('path')
const config = require("./config")
const app = express()
const productsRouter = require("./src")
const oauthRouter = require('./oauth')
const multer = require('multer')

const LoggerMiddleware = (req, res, next) => {
  console.log(`Logged ${req.url} ${req.method}`)
  next()
}
app.use(express.static('static'))
app.use(LoggerMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, './static/index.html'))
})
app.use('/oauth', oauthRouter)

app.use("/products", productsRouter)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname
    cb(null, name)
  }
})
const upload = multer({ storage: storage })

app.post('/register', upload.single('image'), (req, res) => {
  res.status(200).send('File is uploaded')
})

app.use((req, res, next) => {
  return res.status(404).send('Resource not found')
});

const server = app.listen(config.PORT, () => {
  console.log('Listening on port', config.PORT)
});

module.exports = server;
