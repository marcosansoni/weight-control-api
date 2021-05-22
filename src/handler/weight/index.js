const express = require('express')
const getWeight = require('./getWeight')
const postWeight = require('./postWeight')
const bodyRequiredMiddleware = require('../../middleware/bodyRequiredMiddleware')
const deleteWeight = require('./deleteWeight')
const deleteBulkyWeight = require('./deleteBulkyWeight')
const putWeight = require('./putWeight')

const router = express.Router()

router.get('/', getWeight)
router.post('/', bodyRequiredMiddleware, postWeight)
router.delete('/:id', deleteWeight)
router.delete('/', bodyRequiredMiddleware, deleteBulkyWeight)
router.put('/:id', putWeight)

module.exports = router
