const taskRoute = require('./task.route');
const userRoute = require('./user.route');

const authMiddewares = require('../../middewares/auth.middewares');

module.exports = (app) => {
  app.use('/tasks',
    authMiddewares.requireAuth,
    taskRoute)
  app.use('/user', userRoute)

}