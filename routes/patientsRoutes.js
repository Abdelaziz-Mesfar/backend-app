const express = require('express');

const { getAllPatients, createPatient, updatePatient, deletePatient, getSinglePatient } = require('../controllers/patientsController');
const checkAuthorization = require('../middlewares/checkAuth');

const router = express.Router();

router.get('/', checkAuthorization, getAllPatients)
router.post('/', checkAuthorization, createPatient)
router.put('/:id', checkAuthorization, updatePatient)
router.delete('/:id', checkAuthorization, deletePatient)
router.get('/:id', checkAuthorization, getSinglePatient)

module.exports = router