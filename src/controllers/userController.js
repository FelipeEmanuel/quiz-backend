const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body
    // Check for user email
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
    })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password, role} = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExists = await User.findOne({ $or: [ {email}, {name} ]})

    if (userExists) {
        if(userExists.name == name) {
            res.status(400).json({code: 451, message:'Nome já cadastrado!'})
        } else if(userExists.email == email) {
            res.status(400).json({code: 452, message: 'Email já cadastrado!'})
        } else {
            res.status(400).json({code: 453, message: 'Ocorreu um erro!'})
        }
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })
}

module.exports = {
    loginUser, registerUser
}
