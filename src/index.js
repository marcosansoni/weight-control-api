const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()
const apiPort = 5000
const db = require('./db/config')
const indexRoute = require('./routes')

app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/api', indexRoute)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
