const express = require("express")
const router = express.Router()
const controllerUser = require("../controller/user")
const auth = require("../middleware/auth")

//api for registering useers
router.post("/register",controllerUser.register)
//api for LogIn user
router.post("/login",controllerUser.login)

router.post("/create-order",controllerUser.addOrder)

router.get("/view-order",auth,controllerUser.viewOrder)

module.exports = router