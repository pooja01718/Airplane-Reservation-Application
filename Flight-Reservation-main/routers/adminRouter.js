const express = require("express")
const { adminDashboardFileGetter, addFlightFileGetter, flightsFileGetter, deleteflightController, addFlightPostController, bookingsFileGetter, bookingsPostContoller, logoutController, sessionController, getFlightsController } = require("../controllers/adminControllers")
const Router = express.Router()

Router.route("/admindashboard").get(adminDashboardFileGetter)

Router.route("/flights").get(flightsFileGetter)

Router.route("/flights/getflights").get(getFlightsController)

Router.route("/addflight").get(addFlightFileGetter).post(addFlightPostController)

Router.route("/flights/getflights/:id").delete(deleteflightController)

Router.route("/bookings").get(bookingsFileGetter).post(bookingsPostContoller)

Router.route("/session").get(sessionController)

Router.route("/logout").get(logoutController)

module.exports = Router