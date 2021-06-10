const express = require("express");
const router = express.Router();
const SpController = require("../controllers/serviceProvider");

router.post("/registerNew", SpController.registerNew);

router.get("/getServiceProviderList", SpController.getList);

router.get("/createInvoice", SpController.createInvoice);

router.get("/getRegServiceList/:id", SpController.getRegServiceList);

//Update the IsActive state of Service for a particular Service Provider
router.put("/setSpsActiveStatus/:spsId", SpController.updateSpService);

module.exports = router;
