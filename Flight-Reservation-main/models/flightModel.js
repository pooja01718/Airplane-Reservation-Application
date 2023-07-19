const mongoose = require("mongoose")
const Schema = mongoose.Schema

const flightSchema = new Schema({
    _id: {
        type: Number,
        required: [true, "Flight Number Must be Entered"]
    },
    from: {
        type: String,
        required: [true, "From Location Must be Entered"]
    },
    to: {
        type: String,
        required: [true, "To Location Must be Entered"]
    },
    timing: {
        type: String,
        required: [true, "Timing Must be Entered"]
    },
    capacity: {
        type: Number,
        default: 60
    },
    reserved: {
        type: Number,
        default: 0,
        max: [60, "Maxmimum Availability Reached"]
    }
})

const flightModel = mongoose.model("flights", flightSchema)

module.exports = flightModel