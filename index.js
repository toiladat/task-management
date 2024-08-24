const express=require('express');
const app =express()
require('dotenv').config()
const PORT=process.env.PORT

const routeApi=require('./routes/client/index.route.js');
const database=require('./config/database.js');
database.connect()

routeApi(app)


app.listen(PORT,()=>{
  console.log(`App listening on port ${PORT}`);
})