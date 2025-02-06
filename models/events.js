const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    name:{type:String,required:true},
    date:{type:Date,required:true},
    category:{type:String,required:true},
    description:{type:String},
    imgUrl:{type:String,required:true}
})

module.exports = mongoose.model('Events',EventSchema)