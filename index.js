require('dotenv').config()

const express = require('express')
const app = express()

const morgan = require('morgan')
app.use(morgan('tiny'))


const cors = require('cors')
app.use('cors')

const bodyParser = require('body-parser')
app.use(bodyParser.json())


app.get('/', async (req, res, next) => {
    try {

    }
    catch (exception) {
        next(exception)
    }
})

const unknownEndpoint = (req, res) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => { console.log(`Server running on ${PORT}`) })

