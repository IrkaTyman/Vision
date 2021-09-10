module.exports = (app) => {
  const indexController = require('./../controller/index')
  const usersController = require('./../controller/usersController')

  app.route('/').get(indexController.index)
  app.route('/users').get(usersController.users)
}
