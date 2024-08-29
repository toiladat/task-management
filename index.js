const express=require('express');
const app =express()
require('dotenv').config()
const PORT=process.env.PORT
//CORS
const cors=require('cors');
//cors( cross origin resource sharing) dùng để chia sẻ tài nguyên chéo nhau
// chỉ code api mới cần 
// fe được kéo api khi được cấp quyền

//C1:cấp quyền cho tất cả (all cors request)
app.use(cors())

//C2: áp dụng cho 1 domain cụ thể
// const corsOptions={
//   origin:'http://abc.com',
//   optionSuccessStatus:200
// }
// app.use(cors(corsOptions))

//C3: áp dụng cho 1 số các domain

// HẾT CORS


const bodyParser = require('body-parser');
// mac dinh khi chuyen data qua api la dang json ??
// chuyen json tu fe thanh js ben be luon nen khi nhan req.body la js luon
app.use(bodyParser.json())


const routeApi=require('./routes/client/index.route.js');
const database=require('./config/database.js');
database.connect()

routeApi(app)


app.listen(PORT,()=>{
  console.log(`App listening on port ${PORT}`);
})