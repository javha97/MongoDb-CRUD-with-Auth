import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import { user } from "../model/usermodal.js"
export const registerUser = async (req, res) => {
    const { email, password, name } = req.body
    if (!email || !password || !name) {
        res.status(400).send('Pls add all fields')
    }
    const userExists = user.findOne({ email })
    if (userExists) {
        res.status(400).json("User already exists")
    }
    ///hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)
    ///Create user
    const _user = await user.create({
        name,
        email,
        password: hashedPass
    })
    res.status(201).json({
        _id: _user.id,
        name: _user.name,
        email: _user.email,
        token: generateToken(_user.id)
    })
}
export const loginUser = async (req, res) => {
    const { email, password } = req.body
    const _user = await user.findOne({ email })
    if (_user && (await bcrypt.compare(password, _user.password))) {
        res.json({
            _id: _user.id,
            name: _user.name,
            email: _user.email,
            token: generateToken(_user.id)
        })
    } else {
        res.status(400).json('lmao')
    }
}
export const getMe = async (req, res) => {
    const { _id, name, email } = await user.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name,
        email
    })
}

///generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}