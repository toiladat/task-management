const express = require('express');
const route = express.Router()
const controller = require('../../controller/user.controller');
const authMiddewares = require('../../middewares/auth.middewares');

route.post('/register', controller.register)
route.post('/login', controller.login)
route.post('/password/forgot', controller.passwordForgot)
route.post('/password/otp', controller.otpPassword)
route.patch('/password/reset', controller.reset)
route.get('/profile',
  authMiddewares.requireAuth,
  controller.profile
)
module.exports = route