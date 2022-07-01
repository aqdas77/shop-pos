const mongoose = require('mongoose')
require('dotenv').config()
const URL = "mongodb+srv://aqdas21:aqdas7931@ecommerce.6kkpb5v.mongodb.net/shop-pos"
mongoose.connect(URL)
let connectionObj = mongoose.connection
connectionObj.on('connected',()=>{
    console.log('mongodb connection successfull')
})
connectionObj.on('error',()=>{
    console.log('mongodb connection failed')
})
