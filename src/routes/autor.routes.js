const { Router } = require('express');

const autorController = require('../controllers/autor.controller')

routes = Router();

routes.get('/autor', autorController.list);
routes.get('/autor/:id', autorController.getById);

routes.post('/autor', autorController.create)

routes.put('/autor/:id', autorController.update)

routes.delete('/autor/:id', autorController.remove)

module.exports = routes;