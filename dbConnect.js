const mongoose = require('mongoose')
require('dotenv').config()
const URL = process.env.URL
mongoose.connect(URL)
let connectionObj = mongoose.connection
connectionObj.on('connected',()=>{
    console.log('mongodb connection successfull')
})
connectionObj.on('error',()=>{
    console.log('mongodb connection failed')
})
