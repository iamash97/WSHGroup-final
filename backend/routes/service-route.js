const express = require("express");
const multer = require("multer");
const Service = require("../models/dbSchema").serviceSchema;

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const ServiceController = require("../controllers/service");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

//Create new Service
router.post(
  "/addNewService",
  multer({ storage: storage }).single("image"),
  (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    Service.create({
      PricePerHour: req.body.PricePerHour,
      ServiceName: req.body.ServiceName,
      image: url + "/images/" + req.file.filename,
      IsActive: true,
    })
      .then((newpost) => {
        res.status(201).json({
          message: "Service added successfully",
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: "Error",
        });
      });
  }
);

//Update the IsActive state of Service
router.put(
  "/setServiceActiveStatus/:ServiceId",
  ServiceController.updateService
);

//Delete Service
router.put("/deleteService/:ServiceId", ServiceController.deleteService);

//Get Services List for Admin
router.get("/getServiceList", ServiceController.getList);

//Get Services List for Appointment
router.get("/getListForAppointment", ServiceController.getListForAppointment);

router.get("/getPrice/:id", ServiceController.getPricePerHour);

module.exports = router;
