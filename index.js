const express=require('express');
const app =express()
require('dotenv').config()

const database=require('./config/database.js');
database.connect()

const PORT=process.env.PORT

const Task = require('./models/task.models');

app.get('/tasks',async(req,res)=>{
  const tasks=await Task.find({})
  res.json(tasks)
  res.send('Ds cong viec')
})
app.get('/tasks/detail/:id',async(req,res)=>{
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
})

app.listen(PORT,()=>{
  console.log(`App listening on port ${PORT}`);
})