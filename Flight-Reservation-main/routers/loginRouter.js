const express = require("express")
const { sessionController, dashboardFileGetter, filterFlightsFileGetter, reservationController, searchFlightsPostController, mybooinkgsFileGetter, mybookingsController, logoutController } = require("../controllers/loginControllers")
const Router = express.Router()

Router.route("/dashboard").get(dashboardFileGetter)

Router.route("/searchflights").get(filterFlightsFileGetter).post(searchFlightsPostController)

Router.route("/searchflights/:id").post(reservationController)

Router.route("/mybookings").get(mybooinkgsFileGetter)

Router.route("/mybookings/getbookings").get(mybookingsController)

Router.route("/session").get(sessionController)

Router.route("/logout").get(logoutController)

module.exports = Router