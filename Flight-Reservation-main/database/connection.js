const mongoose = require("mongoose")

const connectDB = async (connectionString) => {
    await mongoose.connect(connectionString)
        .then(() => console.log("Database Connection Establisted"))
        .catch((err) => console.log(`Error Occured : \n${err.message}`))
}

module.exports = connectDB