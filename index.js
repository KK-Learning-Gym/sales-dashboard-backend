

const express = require('express')
const app = express()

const morgan = require('morgan')
app.use(morgan('tiny'))

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const { pool } = require('./config')




app.get('/', async (req, res, next) => {
    try {

    }
    catch (exception) {
        next(exception)
    }
})

const getBooks = (request, response) => {
    pool.query('SELECT * FROM books', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const addBook = (request, response) => {
    const { author, title } = request.body
  
    pool.query('INSERT INTO books (author, title) VALUES ($1, $2)', [author, title], error => {
      if (error) {
        throw error
      }
      response.status(201).json({ status: 'success', message: 'Book added.' })
    })
  }
  
  app
    .route('/books')
    // GET endpoint
    .get(getBooks)
    // POST endpoint
    .post(addBook)
  
  // Start server
  app.listen(process.env.PORT || 3002, () => {
    console.log(`Server listening`)
  })

// const unknownEndpoint = (req, res) => {
//     response.status(404).send({ error: 'unknown endpoint' })
// }

// app.use(unknownEndpoint)

// const PORT = process.env.PORT
// app.listen(PORT, () => { console.log(`Server running on ${PORT}`) })

