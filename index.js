import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db.js'
import router from './routes/goalROutes.js'
import { login } from './routes/loginRoutes.js'
const port = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
dotenv.config()
connectDB()
app.use('/', router)
app.use('/login', login)

app.listen(port, () => {
    console.log("server started at", port);
})