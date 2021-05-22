const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const sessionHandler = require('./session/index')
const weightHandler = require('./weight/index')

const router = express.Router()

router.use('/session', sessionHandler)
router.use('/weight', authMiddleware, weightHandler)

module.exports = router
