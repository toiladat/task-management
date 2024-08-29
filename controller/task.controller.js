const Task = require('../models/task.models');
const User=require('../models/user.model');
//[GET]/tasks/
module.exports.index = async (req, res) => {
  // tra ra task duoc tao boi userId hoac user nam trong task do
  const find = {
    $or:[
      {
        createdBy:req.user.id
      },
      {
        listUsers:req.user.id
      }
    ],
    deleted:false
  }
  //trang thai
  if (req.query.status) {
    find.status = req.query.status
  }
  // het trang thai

  //sap xep
  const sort = {}
  if (req.query.sortKey && req.query.sortValue) {
    const sortKey = req.query.sortKey
    const sortValue = req.query.sortValue
    sort[sortKey] = sortValue
  }
  //het sap xep

  //phân trang
  let limitItems = 2
  let page = 1
  let skipItems = 0
  if (parseInt(req.query.page) >= 1 && parseInt(req.query.limitItems) >= 1) {
    const totalItems = await Task.countDocuments(find)
    if (parseInt(req.query.limitItems) <= totalItems)
      limitItems = parseInt(req.query.limitItems)
    const totalPages = Math.ceil(totalItems / limitItems)

    if (parseInt(req.query.page) <= totalPages) {
      page = req.query.page
      skipItems = (page - 1) * limitItems
    }
  }
  //hết phân trang

  //Tìm kiếm
  let keyWord=""
  if(req.query.keyword){
    keyWord=req.query.keyword
    const regex= new RegExp(keyWord,'i')
    find.title=regex
  }
  //hết tìm kiếm

  const tasks = await Task
    .find(find)
    .skip(skipItems)
    .limit(limitItems)
    .sort(sort)

  res.json(tasks)
}
//[GET]/tasks/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const idTask = req.params.id
    const task = await Task.findOne({
      _id: idTask
    })

    res.json(task)
  } catch {
    res.json({
      "message": "Not Found"
    })  
  }
}
//[PATCH]/tasks/change-status
module.exports.changeStatus=async(req,res)=>{
  try{
    const status=req.body.status
    const ids=req.body.ids
    await Task.updateMany({
      _id:{
        $in:ids
      }
    },{
      status:status
    })
    res.json({
      "message":"Cập nhật thành công"
    })
  }
  catch{
    res.json({
      "message":"Cập nhật thất bại"
    })
  }
}
//[POST]/tasks/create
module.exports.create=async (req,res)=>{
try{
  const user=req.user
  req.body.createdBy=req.user._id
  const listUsers=req.body.listUsers
  for(const userId of listUsers){
    //neu co userId sai se tu vao catch
    const checkInfor= await User.findOne({_id:userId})
  }
  const newTask= new Task(req.body)
  newTask.save()
  res.json({
    "message":"Thêm task thành công",
    task:newTask
  })
}
catch{
  res.json({
    message:"Có lỗi xảy ra vui lòng thử lại"
  })
}
}
//[PATCH]/tasks/update
module.exports.update=async(req,res)=>{
  try{
    const id=req.body._id
    delete req.body._id
    await Task.updateOne({
      _id:id
    },req.body)
    res.json({
      "message":"Cập nhật thành công"
    })
  }
  catch{
    res.json({
      "message":"Cập nhật thất bại"
    })
  }
}
//[PATCH]/task/delete
module.exports.delete=async(req,res)=>{
  try{
    const ids=req.body.ids
    await Task.updateMany({
      _id:{
        $in:ids
      }
    },{
      deleted:true
    })
    res.json({
      "message":"Xóa thành công"
    })
  }
  catch{
    res.json({
      "message":"Xóa thất bại"
    })
  }
}