// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")

router.get("/", utilities.handleErrors(invController.buildManagement));
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId));

router.get("/trigger-error", utilities.handleErrors(invController.triggerError))

router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification))
router.post("/add-classification", utilities.handleErrors(invController.addClassification))

router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory))
router.post("/add-inventory", utilities.handleErrors(invController.addInventory))

router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

router.get("/edit/:inv_id", utilities.handleErrors(invController.buildEditView))

router.get("/delete/:inv_id", utilities.handleErrors(invController.buildDeleteView))
router.post("/delete/", utilities.handleErrors(invController.deleteInventory))


module.exports = router;

