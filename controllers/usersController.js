const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const { registerValidator, loginValidator } = require('../utilities/validators')

const registerUser = async (req, res) => {
    try {
        const reqBody = req.body
        const validationResult = registerValidator.validate(reqBody, { abortEarly: false })
        if (validationResult.error) {
            return res.status(400).json(validationResult)
        }
        const { email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(401).json({
                message: "An account with this email already exists"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({
            ...reqBody,
            password: hashedPassword
        })
        const createdUser = await user.save()
        res.status(201).json({
            message: 'account created successfully',
            user: createdUser
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const reqBody = req.body
        const validationResult = loginValidator.validate(reqBody, { abortEarly: false })
        if (validationResult.error) {
            res.status(400).json(validationResult)
        } else {
            const { email, password } = reqBody
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(401).json({
                    error: 'wrong email and/or password'
                })
            }
            const matchedPassword = await bcrypt.compare(password, user.password)
            if (!matchedPassword) {
                return res.status(401).json({
                    error: 'wrong email and/or password'
                })
            }
            user.password = undefined
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
            res.json({
                message: `welcome Dr. ${user.firstName}`,
                user,
                token
            })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    registerUser,
    loginUser
}