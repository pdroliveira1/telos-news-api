const { Router } = require('express');

const authorController = require('../controllers/author.controller')

const { verifyAuthenticate } = require("../middlewares/verifyAuthentication")

routes = Router();

routes.get('/author', authorController.list);
routes.get('/author/:id', authorController.getById);

routes.post('/author', authorController.create)

routes.put('/author/:id', authorController.update)

routes.delete('/author/:id', authorController.remove)

module.exports = routes;