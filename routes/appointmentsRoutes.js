const express = require('express');
const { 
    createNewAppointment, 
    getAllAppointments, 
    getSinglePatientAppointments, 
    updateAppointment, 
    deleteAppointment, 
    getSingleAppointment } = require('../controllers/appointmentsController');

const checkAuthorization = require('../middlewares/checkAuth');

const router = express.Router();

router.get('/', checkAuthorization, getAllAppointments);
router.get('/:id', checkAuthorization, getSingleAppointment);
router.get('/patient-appointment/:patientId', checkAuthorization, getSinglePatientAppointments);
router.post('/:patientId', checkAuthorization, createNewAppointment);
router.put('/:patientId/:id', checkAuthorization,updateAppointment);
router.delete('/:id', checkAuthorization, deleteAppointment);

module.exports = router