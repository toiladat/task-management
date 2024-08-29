const express=require('express');
const route=express.Router()
const controller=require('../../controller/task.controller.js');

route.get('/',controller.index)
route.get('/detail/:id',controller.detail)
route.patch('/change-status',controller.changeStatus)
route.post('/create',controller.create)
route.patch('/update',controller.update)
route.patch('/delete',controller.delete)
module.exports=route
