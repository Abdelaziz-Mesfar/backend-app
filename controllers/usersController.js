const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const Token = require('../models/tokenModel');
const sendEmail = require('../config/nodemailer');
const crypto = require('crypto');
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

        const token = await new Token({
            userId: createdUser._id,
            token: crypto.randomBytes(32).toString("hex")
        }).save();
        
        const html = `<h1> Welcome to My Clinic </h1>
                        <p>You can verify your account simply by <a href='${process.env.BASE_URL}/${createdUser._id}/verify/${token.token}'>Clicking here</a></p>`
        // const url = `${process.env.BASE_URL}/${createdUser._id}/verify/${token.token}`

        await sendEmail(createdUser.email, "Account Confirmation", html)

        res.status(201).json({
            message: 'An email was sent to your account please verify',
            user: createdUser
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error);
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
            if(!user.verified) {
                res.status(401).json({
                    error: 'Your account is not verified. Please check your email to confirm your account'
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

const verifyUser = async(req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id})
        if(!user) {
            return res.status(400).json({
                message: 'Invalid link'
            })
        }

        const token = await Token.findOne({
            userId: user._id,
            token : req.params.token
        })

        if(!token) {
            return res.status(400).json({
                message: 'Invalid link'
            })
        };

        await User.updateOne({_id: user._id}, {verified: true});
        await token.remove();

        res.status(200).json({
            message: 'Email verified successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    verifyUser
}