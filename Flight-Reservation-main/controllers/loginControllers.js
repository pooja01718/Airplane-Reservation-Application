const flightModel = require("../models/flightModel")
const bookingModel = require("../models/bookingModel")
const path = require("path")
const publicPath = path.join(__dirname, "..", "public")

const dashboardFileGetter = (req, res) => {
    res.status(200).sendFile(path.join(publicPath, "dashboard.html"))
}

const filterFlightsFileGetter = (req, res) => {
    res.status(200).sendFile(path.join(publicPath, "filter.html"))
}

const mybooinkgsFileGetter = (req, res) => {
    res.status(200).sendFile(path.join(publicPath, "mybooking.html"))
}

const sessionController = async (req, res) => {
    const { firstname, lastname, phnumber, email } = req.session.userData
    res.status(200).json({ success: true, firstname: firstname, lastname: lastname, phnumber: phnumber, email: email })
}

const searchFlightsPostController = async (req, res) => {
    const { timing } = req.body
    const flightData = await flightModel.find({ timing: timing, reserved: { $lt: 60 } }).exec()
    if (flightData.length != 0) {
        console.log("Flights Filtered")
        res.status(200).json({ success: true, messgae: "Flights Filtered", flightData: flightData })
        return
    }
    console.log("No Flights Available")
    res.status(200).json({ success: false, message: "No Flights Available" })
}

const mybookingsController = async (req, res) => {
    const { firstname, email } = req.session.userData
    const bookingData = await bookingModel.find({ email: email }).exec()
    if (bookingData.length != 0) {
        console.log("Bookings fetched")
        res.status(200).json({ success: true, message: `${firstname}'s Bookings fetched`, bookingData: bookingData, firstname: firstname })
        return
    }
    console.log("No Bookings Available")
    res.status(200).json({ success: false, message: "No Bookings Available", firstname: firstname })
}

const reservationController = async (req, res) => {
    const id = req.params.id
    const flightData = await flightModel.findOne({ _id: id }).exec()
    const { firstname, lastname, phnumber, email } = req.session.userData
    console.log(req.session.userData)
    const { _id: flightnumber, from, to, timing } = flightData
    console.log(flightData)
    await flightModel.updateOne({ _id: id }, { $inc: { reserved: 1 } }).then(() => {
        console.log(`Flight No.${id} Updated`)
    }).catch((err) => {
        console.log("Error Occured")
        res.status(200).json({ success: true, message: `Error Occured : ${err.message}` })
    })
    await bookingModel.create({ firstname: firstname, lastname: lastname, phnumber: phnumber, email: email, flightnumber: flightnumber, from: from, to: to, timing: timing }).then(() => {
        console.log("Ticket Booked")
        res.status(200).json({ success: true, message: "Ticket Booked Successfully" })
    }).catch((err) => {
        console.log(err.message)
        res.status(200).json({ success: true, message: `Error Occured : ${err.message}` })
    })
}

const logoutController = (req, res) => {
    req.session.destroy()
    res.status(301).redirect("/home")
}

module.exports = { logoutController, sessionController, dashboardFileGetter, filterFlightsFileGetter, mybooinkgsFileGetter, searchFlightsPostController, mybookingsController, reservationController }