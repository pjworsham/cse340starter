const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}
const invModel = require("../models/inventory-model")

/*  **********************************
*  Inventory Data Validation Rules
* ********************************* */
validate.inventoryRules = () => {
    return [
      // classification_id is required and must be valid
      body("classification_id")
        .trim()
        .escape()
        .notEmpty()
        .isInt({ min: 1 })
        .withMessage("Please select a valid classification."),

      // inv_make is required and must be string
      body("inv_make")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage("Please provide a vehicle make with at least 3 characters."),

      // inv_model is required and must be string
      body("inv_model")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage("Please provide a vehicle model with at least 3 characters."),

      // inv_description is required
      body("inv_description")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Please provide a vehicle description."),

      // inv_image is required
      body("inv_image")
        .trim()
        .notEmpty()
        .withMessage("Please provide a vehicle image path."),

      // inv_thumbnail is required
      body("inv_thumbnail")
        .trim()
        .notEmpty()
        .withMessage("Please provide a vehicle thumbnail path."),

      // inv_price is required and must be valid
      body("inv_price")
        .trim()
        .notEmpty()
        .isFloat({ min: 0 })
        .withMessage("Please provide a valid price."),

      // inv_year is required and must be valid
      body("inv_year")
        .trim()
        .notEmpty()
        .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
        .withMessage("Please provide a valid year."),

      // inv_miles is required and must be valid
      body("inv_miles")
        .trim()
        .notEmpty()
        .isInt({ min: 0 })
        .withMessage("Please provide valid mileage."),

      // inv_color is required
      body("inv_color")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide a vehicle color.")
    ]
}

/* ******************************
 * Check data and return errors or continue to add inventory
 * ***************************** */
validate.checkInventoryData = async (req, res, next) => {
  const { classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    const classificationSelect = await utilities.buildClassificationList(classification_id)
    res.render("inventory/add-inventory", {
      errors,
      title: "Add New Vehicle",
      nav,
      classificationSelect,
      classification_id,
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
    })
    return
  }
  next()
}

/* ******************************
 * Check data and return errors or continue to edit inventory
 * ***************************** */
validate.checkUpdateData = async (req, res, next) => {
  const { classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color, inv_id } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    const classificationSelect = await utilities.buildClassificationList(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    res.render("inventory/edit-inventory", {
      errors,
      title: "Edit " + itemName,
      nav,
      classificationSelect,
      classification_id,
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
      inv_id
    })
    return
  }
  next()
}

/*  **********************************
*  New Inventory Data Validation Rules (same as inventoryRules)
* ********************************* */
validate.newInventoryRules = () => {
    return [
      // classification_id is required and must be valid
      body("classification_id")
        .trim()
        .escape()
        .notEmpty()
        .isInt({ min: 1 })
        .withMessage("Please select a valid classification."),

      // inv_make is required and must be string
      body("inv_make")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage("Please provide a vehicle make with at least 3 characters."),

      // inv_model is required and must be string
      body("inv_model")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage("Please provide a vehicle model with at least 3 characters."),

      // inv_description is required
      body("inv_description")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Please provide a vehicle description."),

      // inv_image is required
      body("inv_image")
        .trim()
        .notEmpty()
        .withMessage("Please provide a vehicle image path."),

      // inv_thumbnail is required
      body("inv_thumbnail")
        .trim()
        .notEmpty()
        .withMessage("Please provide a vehicle thumbnail path."),

      // inv_price is required and must be valid
      body("inv_price")
        .trim()
        .notEmpty()
        .isFloat({ min: 0 })
        .withMessage("Please provide a valid price."),

      // inv_year is required and must be valid
      body("inv_year")
        .trim()
        .notEmpty()
        .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
        .withMessage("Please provide a valid year."),

      // inv_miles is required and must be valid
      body("inv_miles")
        .trim()
        .notEmpty()
        .isInt({ min: 0 })
        .withMessage("Please provide valid mileage."),

      // inv_color is required
      body("inv_color")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide a vehicle color.")
    ]
}

module.exports = validate