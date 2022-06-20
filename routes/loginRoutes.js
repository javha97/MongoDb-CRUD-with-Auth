import express from 'express'
import { getMe, loginUser, registerUser } from '../controller/userController.js'
import { protect } from '../middleware/authMiddleware.js'
export const login = express.Router()
login.post('/', registerUser)
login.post('/login', loginUser)
login.post('/getme', protect, getMe)