const md5 = require('md5');
const User = require('../models/user.model');
const ForgotPassword=require('../models/forgot-password.models');
const generateHelper = require('../helper/generate.helper');
const sendMailerHelper=require('../helper/sendEmail.helper');
//[POST] /user/register
module.exports.register = async (req, res) => {
  try {
    const email = req.body.email
    const existUser = await User.findOne({
      email: email
    })
    if (existUser) {
      res.json({
        code: 400,
        "message": "Đã tồn tại email"
      })
      return;
    }
    const dataUser = {
      email: email,
      fullName: req.body.fullName,
      password: md5(req.body.password),
      token: generateHelper.generateRandomString(32)
    }
    const newUser = new User(dataUser)
    newUser.save()
    res.json({
      code: 200,
      "message": "Đăng ký thành công",
      token: dataUser.token
    })


  } catch {
    res.json({
      "message": "Đăng ký thất bại"
    })
  }
}
//[POST] /user/login
module.exports.login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body
    const existUser = await User.findOne({
      email: email,
      deleted: false
    })
    if (!existUser) {
      res.json({
        code: 400,
        message: "email không tồn tại"
      })
      return
    }
    if (existUser.password != md5(password)) {
      res.json({
        code: 400,
        message: "Mật khẩu không chính xác"
      })
      return
    }
    res.json({
      code:200,
      message:"Đăng nhập thành công",
      token:existUser.token
    })

  } catch {
    res.json({
      message: "Đăng nhập thất bại",
      code:400
    })
  }
}
//[POST]/user/password/forgot
module.exports.passwordForgot=async(req,res)=>{
  try{
    const email=req.body.email
    const existUser=await User.findOne({
      email:email,
      deleted:false
    })
    if(!existUser){
      res.json({
        code:400,
        message:"Email không tồn tại"
      })
      return
    }
    const otp=generateHelper.generateRandomNumber(6)
    //1 luư otp vào db
    const forgotPasswordData={
      email:email,
      otp:otp,
      expireAt:Date.now()+3*60*1000
    }
    const forgotPassword=new ForgotPassword(forgotPasswordData)
    forgotPassword.save()
    //2 trả về qua email
    const subject="Mã OTP lấy lại mật khẩu"
    const htmls=`<p>Mã OTP là <b style="color:red">${otp}</b>. Có hiệu lực trong 3 phút </p>`
    sendMailerHelper.sendEmail(email,subject,htmls)
    res.json({
      code:200,
      message:"Đã gửi mã OTP"
    })
  }
  catch{
    res.json({
      code:400,
      message:"Nhận mã thất bại"
    })
  }
}
//POST/user/password/otp
module.exports.otpPassword=async(req,res)=>{
  try{
    const {email,otp}=req.body
    const result=await ForgotPassword.findOne({
      email:email,
      otp:otp
    })
    if(!result){
      res.json({
        code:400,
        message:"OTP không chính xác"
      })
      return
    }
    const user=await User.findOne({
      email:email,
      deleted:false
    }).select('token')


    res.json({
      code:200,
      message:"Xác thực thành công",
      token:user.token
    })
  }
  catch{
    res.json({
      code:400,
      message:"Có lỗi xảy ra vui lòng thử lại"
    })
  }
}
//[PATCH]/user/password/reset
module.exports.reset=async(req,res)=>{
  const {token,password}=req.body
  const user=await User.findOne({
    token:token,
    deleted:false
  })
  if(!user){
    res.json({
      code:400,
      message:"Cập nhật mật khẩu thất bại"
    })
    return
  }
  await User.updateOne({
    token:token,
    deleted:false
  },{
    password:md5(password)
  })
  try{
    res.json({
      code:200,
      message:"Cập nhật mật khẩu thành công"
    })
  }
  catch{
    res.json({
      code:400,
      message:"Cập nhật mật khẩu thất bại"
    })
  }
}
//[GET]/user/profile
module.exports.profile=async(req,res)=>{
  try{
    const user=await User.findOne({ 
      token:req.tokenVerify,
      deleted:false
    }).select("-password -token ")

    res.json({
      code:200,
      user:user
    })
  }
  catch{
    res.json({
      code:400,
      message:"Có lỗi xảy ra vui lòng thử lại"
    })
  }
}