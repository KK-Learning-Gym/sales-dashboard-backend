require('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

// Middleware for Logging
const morgan = require('morgan')
app.use(morgan('tiny'))

// Use body-parser if you want to make POST requests

// Pool is used to make queries here (see: node-postgres/npm pg docs on Pooling)
// It can be replaced by Client query
// As not a lot of requests are made to the Postgres server
const { Pool } = require('pg')

const isProduction = process.env.NODE_ENV === 'production'
// For Local Use
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

console.log("Connecting to Database...")
const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: isProduction,
})
console.log("Connected to Database!")

const { check, validationResult } = require('express-validator')

// GET Route for all request, Does nothing
app.get('/', (req, res, next) => {
    pool.query('SELECT current_database();', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})


// Example Query in psql: SELECT * FROM sales WHERE sales.month='Jan 2018';

// Params are checked by express-validator
// Docs:
// https://express-validator.github.io/docs/index.html
// List of Validators:
// https://github.com/validatorjs/validator.js#validators

app.get('/db/:year/:month', [
    // isLength, isNumeric, isAlpha is redundant here but has been intentionally left
    // checks if the year is 2018 or 2019 (data is only available for this)
    check('year').isLength({ min: 4, max: 4 }).isNumeric().isIn(['2018', '2019']),
    // checks if the month is a string from the given list
    check('month').isLength({ min: 3, max: 3 }).isAlpha().isIn(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
], (req, res, next) => {

    // Finds the validation errors in request and wraps them in an object
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    // Don't use string concatenation, its unsafe (see: node-postgres docs)
    const query = "SELECT * FROM sales WHERE sales.month='" + req.params.month + " " + req.params.year + "';"

    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }

        // Some helpful functions
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

        // Executed only if results are returned from the SQL Query
        if (results.rowCount !== 0) {
            // This is sent back
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

            res.status(200).json(resultObject)
        }
        // If no results are returned
        // Removing the else keyword will lead to the following error
        // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        else {
            res.status(404).json({ error: 'no results returned from query' })
        }
        
    })
})

app.get('/db/:year', [
    // isLength, isNumeric is redundant here but has been intentionally left
    // checks if the year is 2018 or 2019 (data is only available for this)
    check('year').isLength({ min: 4, max: 4 }).isNumeric().isIn(['2018', '2019'])
], (req, res, next) => {

    // Finds the validation errors in request and wraps them in an object
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    // Don't use string concatenation, its unsafe (see: node-postgres docs)
    const query = "SELECT * FROM sales WHERE sales.month LIKE '%" + req.params.year + "';"

    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})


// Express Middleware for Unknown Endpoints
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// Start server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server listening`)
})


// Some manual tests
// curl http://localhost:3001/db/2018/Jan
// curl http://localhost:3001/db/2019

// Heroku local port is 5000