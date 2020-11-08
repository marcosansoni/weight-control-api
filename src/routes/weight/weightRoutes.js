const express = require('express')

const router = express.Router()

const weightController = require('../../controller/weightController')

router.post('/', weightController.createWeight)
router.get('/', weightController.getAllFromUser)
router.put('/:id', weightController.updateWeight)
router.delete('/:id', weightController.deleteWeight)
router.delete('/', weightController.deleteBulkyWeight)

module.exports = router
