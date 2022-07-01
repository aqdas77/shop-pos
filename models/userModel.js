const mongoose= require('mongoose')
const userSChema = mongoose.Schema({
   name : {type:String,required:true},
   userId: {type:String,required:true},
   password: {type:String,required:true},
   verified : {type:Boolean,required:true}
},{timestamps : true})

const userModel = mongoose.model('users',userSChema)

module.exports = userModel;