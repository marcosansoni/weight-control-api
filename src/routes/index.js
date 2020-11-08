const express = require('express')
const auth = require('../middleware/auth')

const router = express.Router()

const sessionRoutes = require('./session/sessionRoutes')
const weightRoutes = require('./weight/weightRoutes')
const foodRoutes = require('./food/foodRoutes')

router.use('/session', sessionRoutes)
router.use('/weight', auth, weightRoutes)
router.use('/food', auth, foodRoutes)

module.exports = router
