const Patient = require('../models/patientModel');
const { patientValidator, updatePatientValidator } = require('../utilities/validators');

const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find({ user: req.user._id })
        res.status(200).json(patients)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const createPatient = async (req, res) => {
    console.log({ reqUser: req.user });
    const reqBody = req.body
    const validationResult = patientValidator.validate(reqBody, { abortEarly: false })
    if (validationResult.error) {
        return res.json({ validationResult })
    }
    try {
        const patient = new Patient({ ...reqBody, user: req.user._id })
        const savedPatient = await patient.save()
        res.status(201).json({
            message: "New patient created successfully",
            patient: savedPatient
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updatePatient = async (req, res) => {
    const { id } = req.params
    const reqBody = req.body
    const validationResult = updatePatientValidator.validate(reqBody, { abortEarly: false })
    if (validationResult.error) {
        return res.json(validationResult)
    }
    try {
        const patient = await Patient.findOneAndUpdate({ _id: id, user: req.user._id }, { $set: reqBody })
        if (!patient) {
            return res.status(404).json({ error: "patient not found" })
        }
        return res.json({
            message: "patient updated successfully",
            patient
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const deletePatient = async (req, res) => {
    const { id } = req.params
    try {
        const patient = await Patient.findOneAndDelete({ _id: id, user: req.user._id })
        if (!patient) {
            return res.status(404).json({ error: "patient not found" })
        }
        return res.json({
            message: "patient deleted successfully"
        })
    } catch (error) {
        return res.json({ error: error.message })
    }
}

const getSinglePatient = async (req, res) => {
    const { id } = req.params
    try {
        const patient = await Patient.findOne({ _id: id, user: req.user._id })
        if (!patient) {
            return res.status(404).json({ error: "patient not found" })
        }
        return res.json(patient)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAllPatients,
    createPatient,
    updatePatient,
    deletePatient,
    getSinglePatient
}