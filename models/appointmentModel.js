const { object } = require('joi')
const { Schema, model } = require('mongoose')

const appointmentSchema = new Schema({
   
    title: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }
})

module.exports = model('Appointment', appointmentSchema)