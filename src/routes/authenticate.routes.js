const {Router} = require("express")

const authenticateController = require("../controllers/authenticate.controller")

const routes = Router()

routes.post("/authenticate", authenticateController.login)

module.exports = routes