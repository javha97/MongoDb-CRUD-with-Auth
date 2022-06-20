import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db.js'
import router from './routes/goalROutes.js'
import { login } from './routes/loginRoutes.js'
import { lol } from './middleware/errorMiddleware.js'
const port = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
dotenv.config()
connectDB()
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });
app.use('/', router)
app.use('/log', login)
// app.use)

// app.post('/user', async (req, res) => {
//     const { email, name, password } = req.body
//     const hashed = await bcrypt.genSalt(10)
//     const hpass = await bcrypt.hash(password, hashed)
//     const _user = await user.create({
//         email,
//         name,
//         password: hpass,
//     })
//     res.json(_user)
// })


app.use(lol)
app.listen(port, () => {
    console.log("server started at", port);
})