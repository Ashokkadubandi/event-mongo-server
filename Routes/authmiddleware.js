const jwtToken = require('jsonwebtoken')
require('dotenv').config()

const authMiddleWare = (req,res,next) => {
    const token = req.header('Authorization')
    if(!token){
        return res.status(400).json({
            msg:'Access Denied'
        })
    }
    try{
        let decoded = jwtToken.verify(token.split(" ")[1],process.env.SEC_KEY)
        req.user = decoded
        console.log(decoded)
        next()
    }catch(e){
        res.status(500).json({
            msg:"Server Error",
            detail:"Something went wrong please try again later"
        })
    }
}

module.exports = authMiddleWare