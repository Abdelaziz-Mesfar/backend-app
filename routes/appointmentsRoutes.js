const express = require('express');
const { 
    createNewAppointment, 
    getAllAppointments, 
    getSinglePatientAppointments, 
    updateAppointment, 
    deleteAppointment, 
    getSingleAppointment } = require('../controllers/appointmentsController');

// const checkAuth = require('../middlewares/check-auth')

const router = express.Router();

router.get('/', getAllAppointments);
router.get('/:id', getSingleAppointment);
router.get('/patient-appointment/:patientId', getSinglePatientAppointments);
router.post('/:patientId', createNewAppointment);
router.put('/:patientId/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

module.exports = router