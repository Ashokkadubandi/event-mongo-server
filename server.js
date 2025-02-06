const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./config/db')
const User = require('./models/user')
const authRoutes = require('./Routes/authRoutes')
const eventRoutes = require('./Routes/eventRoutes')

app.use(express.json())
app.use(cors())

connectDB()

app.use('/user',authRoutes)
app.use('/events',eventRoutes)

const PORT = process.env.PORT || 3002

app.listen(PORT,() => {
    console.log('http://localhost:3002')
})
