const { Schema, model } = require('mongoose');

const toothSchema = new Schema({
    number: String,
    description: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }
}, {
    timestamps: true
})

module.exports = model('Tooth', toothSchema)