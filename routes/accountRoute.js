// route for path to My Account
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require('../utilities/account-validation')

// Wk05 default route for account management (must be loged in)
router.get("/", 
  utilities.checkJWTToken,    // Check JWT token first
  utilities.checkLogin,       // check if logged in
  utilities.handleErrors(accountController.buildAccountManagement))

// Route to display login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))


// Route to display registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))

/// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

// Route with flash message example
router.get("/test-flash", utilities.handleErrors(accountController.testFlash))

// Process the login request (temporarily without validation)
router.post("/login", 
  regValidate.loginRules(),        // Validation rules
  regValidate.checkLoginData,      // Check validation
  utilities.handleErrors(accountController.accountLogin))

// Wk 5 assignment - logout route
router.get("/logout", utilities.handleErrors(accountController.accountLogout));

module.exports = router