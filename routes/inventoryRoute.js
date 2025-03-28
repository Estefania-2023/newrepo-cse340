// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const validate = require('../utilities/inventory-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:inv_id", utilities.handleErrors (invController.buildById));

router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification)); // add classification
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory)); // add inventory
router.get("/", 
    utilities.handleErrors(invController.buildManagement));

// Route to process adding a classification to database
router.post('/add-classification', 
    validate.classificationRules(),
    validate.checkClassificationData,
    utilities.handleErrors(invController.addClassification));

// Route to process adding inventory to database
router.post('/add-inventory',
    validate.inventoryRules(),
    validate.checkInventoryData,
    utilities.handleErrors(invController.addToInventory));

    


module.exports = router;