const express = require("express");
const router = express.Router();
const AppointmentController = require("../controllers/appointments");

//Get Service Provider list based on Service ID and Appointment Date
router.get("/getSpList/:id", AppointmentController.getSpList);

//Get Appointment list for Service Provider
router.get("/getAppointmentList/:id", AppointmentController.getAppointmentList);

//Close Appointment
router.put("/closeAppointment/:AppointmentId", AppointmentController.closeAppointment);

//Cancel Appointment
router.put("/cancelAppointment/:AppointmentId", AppointmentController.cancelAppointment);

//Get Appointment list for User Client
router.get("/getUserAppointmentList/:id", AppointmentController.getUserAppointmentList);

module.exports = router;
