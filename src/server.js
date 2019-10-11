require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV, PORT } = require('./config')
const app = express()
const bodyParser = express.json()
const allPets = require('./allPets.js')
const pet = require('./pet')

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.all('/*', (req, res, next) => {
  console.log('Authorization not implimented yet.')
  next()
})

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.get('/allPets', (req, res) => {
  allPets.get(req, res)
})

app.patch('/pet/:id', bodyParser, (req, res) => {
  pet.patch(req, res)
})

app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
      response = { error: { message: 'server error' } }
  } else {
      console.error(error)
      response = { message: error.message, error }
  }
  res.status(500).json(response)
})

app.listen(PORT,()=>{
  console.log(`Serving on ${PORT}`);
});