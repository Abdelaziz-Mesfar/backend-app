const express = require('express');

const {
    addToothDescription,
    deleteToothDescription,
    getAllTeethOnePatientDescription,
    updateToothDescription
} = require('../controllers/teethController');

// const checkAuth = require('../middlewares/check-auth')

const router = express.Router()

router.get('/:patientId/:toothId', getAllTeethOnePatientDescription)
router.post('/:patientId/:toothId', addToothDescription)
router.delete('/:patientId/:toothId/:id', deleteToothDescription)
router.put('/:patientId/:toothId/:id', updateToothDescription)

module.exports = router