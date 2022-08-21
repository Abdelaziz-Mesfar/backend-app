const express = require('express');

const {
    addToothDescription,
    deleteToothDescription,
    getAllTeethOnePatientDescription,
    updateToothDescription
} = require('../controllers/teethController');

const checkAuthorization = require('../middlewares/checkAuth');

const router = express.Router()

router.get('/:patientId/:toothId', checkAuthorization, getAllTeethOnePatientDescription)
router.post('/:patientId/:toothId', checkAuthorization, addToothDescription)
router.delete('/:patientId/:toothId/:id', checkAuthorization, deleteToothDescription)
router.put('/:patientId/:toothId/:id', checkAuthorization, updateToothDescription)

module.exports = router