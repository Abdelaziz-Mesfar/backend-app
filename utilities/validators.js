const Joi = require('joi');

const patientValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.number(),
    age: Joi.number(),
    adress: Joi.string()
})

const updatePatientValidator = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    phone: Joi.number(),
    age: Joi.number(),
    adress: Joi.string()
    
})

const appointmentValidator = Joi.object({
    title: Joi.string().required(),
    start: Joi.date().required(),
    end: Joi.date().required()
})

const updateAppointmentValidator = Joi.object({
    title: Joi.string(),
    start: Joi.date(),
    end: Joi.date()
})

const registerValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number(),
    adress: Joi.string(),
    password: Joi.string().required().min(8)
})

const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})




module.exports = {
    patientValidator,
    updatePatientValidator,
    appointmentValidator,
    updateAppointmentValidator,
    loginValidator,
    registerValidator
}