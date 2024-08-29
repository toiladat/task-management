const mongoose=require('mongoose');
const taskSchema= new mongoose.Schema({
  title:String,
  status:String,
  content:String,
  timeStart:Date,
  timeFinish:Date,
  createdBy:String,
  listUsers:Array,
  parentIdTask:String,
  deleted:{
    type:Boolean,
    default:false
  },
  deletedAt:Date
},{
  timestamps:true
})
const Task=mongoose.model("Task",taskSchema,'tasks')
module.exports=Task