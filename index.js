const express=require('express');
const app =express()
require('dotenv').config()
const PORT=process.env.PORT

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