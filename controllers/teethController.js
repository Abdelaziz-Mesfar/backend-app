const Tooth = require('../models/toothModel');
const { toothValidator } = require('../utilities/validators')

const getAllTeethOnePatientDescription = async (req, res) => {
    try {
        const tooth = await Tooth.find({ number: req.params.toothId, user: req.user._id, patient: req.params.patientId })
        res.status(200).json(tooth)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const addToothDescription = async (req, res) => {
    const reqBody = req.body
    const validationResult = toothValidator.validate(reqBody, { abortEarly: false })
    if (validationResult.error) {
        return res.json({ validationResult })
    }
    try {
        console.log({ reqParams: req.params });
        // console.log({reqPatient: req.patient});
        // console.log({reqUser: req.user});
        const tooth = new Tooth({ ...reqBody, number: req.params.toothId, user: req.user._id, patient: req.params.patientId })
        const savedTooth = await tooth.save()
        res.json({
            message: 'description added successfully',
            tooth: savedTooth
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteToothDescription = async (req, res) => {
    const { id } = req.params
    try {
        const tooth = await Tooth.findOneAndDelete({ _id: id, user: req.user._id, patient: req.params.patientId })
        if (!tooth) {
            return res.status(404).json({
                message: 'tooth description not found'
            })
        }
        return res.json({
            message: 'description deleted successfully'
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateToothDescription = async (req, res) => {
    const { id } = req.params
    const reqBody = req.body
    const validationResult = toothValidator.validate(reqBody, { abortEarly: false })
    if (validationResult.error) {
        return res.json({ validationResult })
    }
    try {
        const toothDescription = await Tooth.findOneAndUpdate({ _id: id, user: req.user._id, patient: req.params.patientId }, { $set: reqBody })
        if(!toothDescription){
            return res.status(404).json({error: "Description not found"})
        }
        return res.json({
            message: "Description updated successfully",
            toothDescription
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    addToothDescription,
    deleteToothDescription,
    getAllTeethOnePatientDescription,
    updateToothDescription
}