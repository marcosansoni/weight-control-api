const express = require('express')

const router = express.Router()

const foodController = require('../../controller/foodController')

router.post('/', foodController.createFood)
router.get('/', foodController.getFood)
router.put('/associateFood/:id', foodController.associateFoodWithExternalApi)

module.exports = router
