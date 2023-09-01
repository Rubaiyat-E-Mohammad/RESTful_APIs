const express = require('express');
const app = express();
const config = require('./config');
const authRouter = require('./authentication')
const userRouter = require('./User');
const verifyAuth = require('./authentication/authMiddleware.js')
const dateFormat = require('date-format')
const morgan = require('morgan')
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDoc = YAML.load('./api-docs/swagger.yaml')

const LoggerMiddleware = (req, res, next) => {
  console.log(`Logged ${req.url} ${req.method}`);
  next();
};
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDoc))
app.use(LoggerMiddleware);
app.use(express.json());
morgan.token('time', ()=> dateFormat.asString(dateFormat.IS08601_FORMAT, new Date()))
app.use(morgan('[:time] :remote-addr :method :url :status :res[content-length] :response-time ms'))
app.use('/auth', authRouter)
app.use('/users',verifyAuth, userRouter);

app.use((req, res, next) => {
  res.status(404).send('Resource not found');
});

app.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}`);
});
