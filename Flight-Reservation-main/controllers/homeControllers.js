const path = require("path")
const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const publicPath = path.join(__dirname, "..", "public")

const homeController = (req, res) => {
    res.status(200).sendFile(path.join(publicPath, "home.html"))
}

const loginGetController = (req, res) => {
    res.status(200).sendFile(path.join(publicPath, "login.html"))
}

const registrationGetController = (req, res) => {
    res.status(200).sendFile(path.join(publicPath, "registration.html"))
}

const loginPostController = async (req, res) => {
    let { email, password } = req.body
    email = email.toLowerCase()
    const userData = await userModel.findOne({ _id: email }).exec()
    if (!userData) {
        console.log("User Not Found")
        res.status(200).json({ success: false, message: "User Not Found" })
        return
    }
    const passwordCheck = await bcrypt.compare(password, userData.password)
    if (passwordCheck) {
        const session = req.session
        const { firstname, lastname, phnumber, _id: email } = userData
        session.userData = { firstname, lastname, phnumber, email }
        console.log(`User ${firstname} Logged in`)
        res.status(200).json({ success: true, message: `${userData.firstname} logged in...` })
    } else {
        console.log("Error Occured")
        res.status(200).json({ success: false, message: "User Not Found" })
    }
}

const registrationPostController = async (req, res) => {
    let { firstname, lastname, phnumber, email, password } = req.body
    firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase()
    lastname = lastname.charAt(0).toUpperCase() + lastname.slice(1).toLowerCase()
    email = email.toLowerCase()
    const hashedPassword = await bcrypt.hash(password, 10)
    await userModel.create({ _id: email, firstname: firstname, lastname: lastname, phnumber: phnumber, password: hashedPassword }).then(() => {
        console.log(`New User ${firstname} was created!!`)
        res.status(200).json({ success: true, message: "New User Created" })
    }).catch((err) => {
        console.log(`Error Occured : ${err.message}`)
        res.status(200).json({ success: false, message: err.message })
    })
}

const adminLoginController = async (req, res) => {
    let { email, password, role } = req.body
    email = email.toLowerCase()
    const userData = await userModel.findOne({ _id: email }).exec()
    if (!userData) {
        console.log("Admin Not Found")
        res.status(200).json({ success: false, message: "User Not Found" })
        return
    } else if (userData.role != role) {
        console.log("Admin Not Found")
        res.status(200).json({ success: false, message: "User Not Found" })
        return
    }
    const passwordCheck = await bcrypt.compare(password, userData.password)
    if (passwordCheck) {
        const session = req.session
        const { firstname, lastname, phnumber, _id:email } = userData
        session.userData = { firstname, lastname, phnumber, email }
        console.log(`User ${firstname} Logged in`)
        res.status(200).json({ success: true, message: `${userData.firstname} logged in...` })
    } else {
        console.log("Error Occured")
        res.status(200).json({ success: false, message: "User Not Found" })
    }
}

module.exports = { homeController, loginGetController, registrationGetController, loginPostController, registrationPostController, adminLoginController }
