const User = require("../models/user.model")

module.exports.requireAuth = async (req, res, next) => {
  const authorization = req.headers.authorization
  if (!authorization) {
    res.json({
      message: "Vui lòng gửi thêm token"
    })
    return
  }
  const token = authorization.split(" ")[1]
  if (!token) {
    res.json({
      message: "Vui lòng gửi thêm token"
    })
    return
  }

  const user = await User.findOne({
    token: token,
    deleted: false
  })
  if (!user) {
    res.json({
      message: "Truy cập không hợp lệ",
      code: 403
    })
    return
  }
  req.user=user
  req.tokenVerify=token

  next()
}