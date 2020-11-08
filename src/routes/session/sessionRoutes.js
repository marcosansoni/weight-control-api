const express = require('express')

const router = express.Router()

const sessionController = require('../../controller/sessionController')

router.post('/login', sessionController.login)
router.post('/signup', sessionController.signup)

module.exports = router
