const Appointment = require('../models/appointmentModel');
const { appointmentValidator, updateAppointmentValidator } = require('../utilities/validators');

const createNewAppointment = async (req, res) => {
    const reqBody = req.body
    const validationResult = appointmentValidator.validate(reqBody, { abortEarly: false })
    if (validationResult.error) {
        return res.json({ validationResult })
    }
    try {
        const appointment = new Appointment({ ...reqBody, user: req.user._id, /*patient: patient*/ patient: req.params.patientId })
        const savedAppointment = await appointment.save()
        res.status(201).json({
            message: "A new appointment created successfully",
            appointment: savedAppointment
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ user: req.user._id })
        res.status(200).json(appointments)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getSinglePatientAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ user: req.user._id, patient: req.params.patientId })
        res.status(200).json(appointments)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateAppointment = async (req, res) => {
    const { id } = req.params
    const reqBody = req.body
    const validationResult = updateAppointmentValidator.validate(reqBody, { abortEarly: false })
    if (validationResult.error) {
        return res.json({ validationResult })
    }
    try {
        const appointment = await Appointment.findOneAndUpdate({ _id: id, user: req.user._id }, { $set: reqBody })
        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found"
            })
        }
        return res.json({
            message: "Appointment updated successfully",
            appointment
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteAppointment = async (req, res) => {
    const { id } = req.params
    try {
        const appointment = await Appointment.findOneAndDelete({ _id: id, user: req.user._id})
        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found"
            })
        }
        return res.json({
            message: "Appointment deleted successfully"
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getSingleAppointment = async (req, res) => {
    const { id } = req.params
    try {
        const appointment = await Appointment.findOne({ _id: id, user: req.user._id })
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" })
        }
        return res.json(appointment)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createNewAppointment,
    getAllAppointments,
    getSinglePatientAppointments,
    updateAppointment,
    deleteAppointment,
    getSingleAppointment
}