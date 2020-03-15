require('dotenv').config()

const express = require('express')
const app = express()

// Middleware for Logging
const morgan = require('morgan')
app.use(morgan('tiny'))

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Pool is used to make queries (see: node-postgres docs)
const { Pool } = require('pg')
const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: isProduction,
})

app.get('/', (req, res, next) => {
    try {
        pool.query('SELECT current_database();', (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        })
    }
    catch (error) {
        next(error)
    }
})

// app.post('/', (req, res, next) => {
//     try {
//         const { author, title } = req.body

//         pool.query(';', [author, title], error => {
//             if (error) {
//                 throw error
//             }
//             res.status(201).json({ status: 'success', message: 'Done!' })
//         })
//     }
//     catch (error) {
//         next(error)
//     }
// })

// Middleware for Unknown Endpoints
const unknownEndpoint = (req, res) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// Start server
const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(`Server listening`)
})

//heroku test
// heroku local web