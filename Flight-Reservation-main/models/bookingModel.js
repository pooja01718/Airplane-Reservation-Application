const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bookingSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email must be Entered"]
    },
    firstname: {
        type: String,
        required: [true, "First Name must be Entered"]
    },
    lastname: {
        type: String,
        required: [true, "Last Name must be Entered"]
    },
    phnumber: {
        type: Number,
        required: [true, "Phone Number must be Entered"]
    },
    flightnumber: {
        type: Number,
        required: [true, "Plane Number must be Entered"]
    },
    from: {
        type: String,
        required: [true, "From location must be Entered"]
    },
    to: {
        type: String,
        required: [true, "To Location must be Entered"]
    },
    timing: {
        type: String,
        required: [true, "Timing must be Entered"]
    }
})

const bookingModel = mongoose.model("bookings",bookingSchema)

module.exports = bookingModel