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

// For Local Use
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: isProduction,
})

// GET Route for all request
app.get('/', (req, res, next) => {
    pool.query('SELECT current_database();', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})


//Example Query: SELECT * FROM sales WHERE sales.month='Jan 2018';
app.get('/:year/:month', (req, res, next) => {
    const query = "SELECT * FROM sales WHERE sales.month='" + req.params.month + " " + req.params.year + "';"
    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        function revenueOf(source) {
            return results.rows
                .filter(object => object.source === source)
                .map(filteredObject => filteredObject.revenue)[0]
        }
        function ordersFrom(source) {
            return results.rows
                .filter(object => object.source === source)
                .map(filteredObject => filteredObject.orders)[0]
        }
        function totalRevenue() {
            return results.rows
                .map(object => object.revenue)
                .reduce((accumulator, currentValue) => accumulator + currentValue)
        }

        const resultObject = {
            "Revenues": {
                "AM": revenueOf("AM"),
                "EB": revenueOf("EB"),
                "ET": revenueOf("ET"),
                "total": totalRevenue(),
            },
            "Rates": {
                "purchase": Math.floor(results.rows.map(object => object.purchase_rate).reduce((accumulator, currentValue) => accumulator + currentValue) / 3),
                "checkout": Math.floor(results.rows.map(object => object.checkout_rate).reduce((accumulator, currentValue) => accumulator + currentValue) / 3),
                "abandoned": Math.floor(results.rows.map(object => object.abandoned_rate).reduce((accumulator, currentValue) => accumulator + currentValue) / 3),
            },
            "OrdersByStore": {
                "AM": ordersFrom("AM"),
                "EB": ordersFrom("EB"),
                "ET": ordersFrom("ET"),
            },
            "OrdersByRegion": {
                "nw": results.rows.map(object => object.orders_nw).reduce((accumulator, currentValue) => accumulator + currentValue),
                "sw": results.rows.map(object => object.orders_sw).reduce((accumulator, currentValue) => accumulator + currentValue),
                "c": results.rows.map(object => object.orders_c).reduce((accumulator, currentValue) => accumulator + currentValue),
                "ne": results.rows.map(object => object.orders_ne).reduce((accumulator, currentValue) => accumulator + currentValue),
                "se": results.rows.map(object => object.orders_se).reduce((accumulator, currentValue) => accumulator + currentValue),
            },
        }
        console.log(resultObject)
        res.status(200).json(results.rows)
    })
})

app.get('/:year', (req, res, next) => {
    const query = "SELECT * FROM sales WHERE sales.month LIKE '%" + req.params.year + "';"
    console.log(query)
    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})

// Middleware for Unknown Endpoints
const unknownEndpoint = (req, res) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// Start server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server listening`)
})