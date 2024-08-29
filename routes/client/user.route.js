const express=require('express');
const route=express.Router()
const controller=require('../../controller/user.controller');

route.post('/register',controller.register)
route.post('/login',controller.login)
route.post('/password/forgot',controller.passwordForgot)
route.post('/password/otp',controller.otpPassword)
module.exports=route