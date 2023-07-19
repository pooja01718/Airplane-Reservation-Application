const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    _id: {
        type: String,
        required: [true, "Email must be entered"]
    },
    firstname: {
        type: String,
        required: [true, "First Name must be entered"]
    },
    lastname: {
        type: String,
        required: [true, "Last Name must be entered"]
    },
    phnumber: {
        type: Number,
        unique: true,
        required: [true, "Phone Number must be entered"]
    },
    password: {
        type: String,
        required: [true, "Password must be entered"]
    },
    role: {
        type: String,
        default: "user"
    }
}, { timestamps: true })

const userModel = mongoose.model("users", userSchema)

module.exports = userModel