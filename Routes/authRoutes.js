const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const authMiddleWare = require('./authmiddleware')
const router = express.Router()
require('dotenv').config()


router.post("/register", async (req,res) => {
    try{
        const {username,email,password} = req.body
        let user = await User.findOne({username})
        if(user){
            return res.status(400).json({
                mes:'User already exists'
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        user = new User({
            username,
            email,
            password:hashedPassword
        })
        await user.save()
        res.status(200).json({
            message:'User successfully registedred'
        })
    }catch(e){
        res.status(500).json({
            message:'User Error',
            detail:'Try to give user details as unique'
        })
    }
})

router.post('/login',async (req,res) => {
    const {username,password} = req.body
    let user = await User.findOne({username})
    if(!user){
        return res.status(400).json({
            msg:'Invalid user details'
        })
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({
            msg:"Error invalid password"
        })
    }
    let payload = {username:username}
    let jwtToken = jwt.sign(payload,process.env.SEC_KEY)
    let resTrans = {id:user._id,name:user.username,mail:user.email}
    res.status(200).json({
        jwtToken,
        user:resTrans,
    })
})

router.get('/userDetails',authMiddleWare, (req,res) => {
    res.status(200).json({
        msg:'User data recieved'
    })
    
})

module.exports = router