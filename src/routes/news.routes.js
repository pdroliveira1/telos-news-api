const {Router} = require("express")

const newsController = require("../controllers/news.controller.js")

const { verifyAuthenticate } = require("../middlewares/verifyAuthentication")

routes = Router()

routes.get('/news', newsController.list);
routes.get('/news/:id', newsController.getById);

routes.post('/news', verifyAuthenticate, newsController.create)

routes.put('/news/:id', newsController.update)

routes.delete('/news/:id', newsController.remove)

module.exports = routes;