const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    errors: null,
    grid,
    messages: function() { return ''; }  // Add this line
  })
}

/* *****************************************************
 *  Build inventory item detail view --------THIS IS STEP #2 ADDED A FUNCTION
 * ****************************************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inventoryId = req.params.inventoryId
  const itemData = await invModel.getInventoryByInvId(inventoryId)
  const grid = await utilities.buildItemDetailView(itemData)
  let nav = await utilities.getNav()
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("./inventory/detail", {
    title: itemName,
    nav,
    errors: null,
    grid,
     messages: function() { return ''; }  // Add this line
  })

}

/* ***************************
 *  Trigger intentional error for testing
 * ************************** */
invCont.triggerError = async function (req, res, next) {
  // Intentionally throw an error
  throw new Error("This is an intentional 500 error for testing purposes!")
}

module.exports = invCont