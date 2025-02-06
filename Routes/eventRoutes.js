const express = require('express')
const Events = require('../models/events')
const router = express.Router()


router.post('/upload',async (req,res) => {
    try {
        const {name,date,category,description,imgUrl} = req.body
        const event = new Events({name,date,category,description,imgUrl})
        
        await event.save()
        res.status(200).json({
            msg:'Details successfully added'
        })
    } catch (error) {
        res.status(500).json({
            msg:'Server Error'
        })
    }

})

router.get('/',async (req,res) => {
    try{
        const {upcoming,category} = req.query
        let filter = {}
        if(category){
            filter.category = category
        }
        if(upcoming === 'true'){
            filter.date = {$gte:new Date()}
        }else if(upcoming === 'false'){
            filter.date = {$lt:new Date()}
        }
        const event = await Events.find(filter).sort({date:1})
        res.status(200).json({
            event
        })
    }catch(e){
        res.status(500).json({
            msg:"Server Error"
        })
    }
})

router.get('/:id',async (req,res) => {
    
    try {
        let event = await Events.findById(req.params.id)
        res.status(200).json({
            event
        })
    } catch (error) {
        res.status(500).json({
            msg:"Event not found"
        })
    }
})

module.exports = router