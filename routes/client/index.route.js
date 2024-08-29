const taskRoute=require('./task.route');
const userRoute=require('./user.route');
module.exports=(app)=>{
  app.use('/tasks',taskRoute)
  app.use('/user',userRoute)

}