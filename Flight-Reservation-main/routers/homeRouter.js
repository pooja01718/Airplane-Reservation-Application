const express = require("express")
const { homeController, registrationGetController, loginGetController, loginPostController, registrationPostController, adminLoginController } = require("../controllers/homeControllers")
const Router = express.Router()

Router.route("/").get(homeController)

Router.route("/login").get(loginGetController).post(loginPostController)

Router.route("/registration").get(registrationGetController).post(registrationPostController)

Router.route("/adminlogin").post(adminLoginController)

module.exports = Router