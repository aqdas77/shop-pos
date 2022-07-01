const mongoose = require('mongoose')
require('dotenv').config()
console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL)
let connectionObj = mongoose.connection
connectionObj.on('connected',()=>{
    console.log('mongodb connection successfull')
})
connectionObj.on('error',()=>{
    console.log('mongodb connection failed')
})