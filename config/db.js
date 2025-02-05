const mongoose = require('mongoose')
require('dotenv').config()
const {DB_USER,DB_PASSWORD} = process.env

let dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.cltye.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const connectedDB = async () => {
    try{
        await mongoose.connect(dbURL).then(function(connection){
            console.log('connection successfull')
        })

    }catch(e){
        console.log(e)
        process.exit(1)
    }
}

module.exports =  connectedDB