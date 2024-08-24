const Task = require('../models/task.models');
//[GET]/tasks/
module.exports.index=async(req,res)=>{
  const tasks=await Task.find({})
  res.json(tasks)
  res.send('Ds cong viec')
}
//[GET]/tasks/detail/:id
module.exports.detail=async(req,res)=>{
  try{
    const idTask=req.params.id
    const task=await Task.findOne({
      _id:idTask
    })
    res.json(task)
  }
  catch{
    res.json({
      "message":"Not Found"
    })
  }
}