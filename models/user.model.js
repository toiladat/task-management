const mongoose=require('mongoose');
const userSchema= new mongoose.Schema({
  email:{
    type:String,
    unique:true
  },
  password:String,
  token:String, 
  fullName:String,
  deleted:{
    default:false,
    type:Boolean
  }
},{timestamps:true})
const User=mongoose.model('User',userSchema,'users')
module.exports=User