const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const pino = require('express-pino-logger')()
require('dotenv').config()
const db = require('./db/config')
const handler = require('./handler/index')
const errorHandler = require('./error/errorHandler')
const { Port } = require('./environment/envManager')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(pino)
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/api', handler)
app.use(errorHandler)

app.listen(Port, () => {
  pino.logger.info(`Server running on port ${Port}`)
})
