const express = require('express')
const postLogin = require('./postLogin')
const postSignup = require('./postSignup')
const bodyRequiredMiddleware = require('../../middleware/bodyRequiredMiddleware')

const router = express.Router()

router.post('/login', bodyRequiredMiddleware, postLogin)
router.post('/signup', bodyRequiredMiddleware, postSignup)

module.exports = router
