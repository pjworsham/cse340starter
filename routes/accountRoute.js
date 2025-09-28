// route for path to My Account
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")

// Route to display login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Route to display registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// registration route
router.post('/register', utilities.handleErrors(accountController.registerAccount))

// Route with flash message example
router.get("/test-flash", utilities.handleErrors(accountController.testFlash))

module.exports = router