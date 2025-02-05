const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./config/db')
const User = require('./models/user')
const authRoutes = require('./Routes/authRoutes')

app.use(express.json())
app.use(cors())

connectDB()

app.use('/user',authRoutes)



app.listen(3002,() => {
    console.log('http://localhost:3002')
})
