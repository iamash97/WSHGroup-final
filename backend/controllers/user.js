const User = require("../models/dbSchema").userSchema;
const Appointment = require("../models/dbSchema").appointmentSchema;
const Address = require("../models/dbSchema").addressSchema;
const Service = require("../models/dbSchema").serviceSchema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ServiceProvider = require("../models/dbSchema").serviceProviderSchema;

exports.login = (req, res) => {
  let fetchedUser;
  User.findOne({ where: { Email: req.body.Email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.UsrPwd, user.UsrPwd);
    })
    .then((result) => {
      if (!result) {
        console.log("error");
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      const token = jwt.sign(
        {
          Email: fetchedUser.Email,
          userId: fetchedUser.id,
          usrrole: fetchedUser.UsrRole,
        },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      console.log(token);
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        UserId: fetchedUser.id,
        UsrRole: fetchedUser.UsrRole,
        IsActive: fetchedUser.IsActive
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({
        message: err,
      });
    });
};

exports.signUp = (req, res, next) => {
  bcrypt.hash(req.body.UsrPwd, 10).then((hash) =>
    User.findOrCreate({
      where: {
        Email: req.body.Email,
      },
      defaults: {
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Age: req.body.Age,
      Email: req.body.Email,
      UsrPwd: hash,
      UsrRole: req.body.UsrRole,
      IsActive: req.body.IsActive,
    }
  })
      .then((newpost) => {
        res.status(201).json({
          message: "User added successfully",
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: error,
        });
      })
  );
};

exports.getUserList = function (req, res) {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  User.findAndCountAll({
    where: { UsrRole: 2 },
    limit: pageSize,
    offset: pageSize * (currentPage - 1),
  })
    .then((result) => {
      res.status(200).json({
        message: "Users extracted successfully",
        users: result.rows,
        count: result.count,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    });
};

exports.getSpListForAdmin = function (req, res) {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  User.findAndCountAll({
    where: { UsrRole: 1 },
    limit: pageSize,
    offset: pageSize * (currentPage - 1),
  })
    .then((result) => {
      res.status(200).json({
        message: "Users extracted successfully",
        users: result.rows,
        count: result.count,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    });
};

exports.setUserActiveStatus = function (req, res) {
  User.update(
    { IsActive: false },
    { where: { id: req.params.UserId, IsActive: true } }
  )
    .then((rowsUpdated) => {
      if (rowsUpdated == 0) {
        User.update(
          { IsActive: true },
          { where: { id: req.params.UserId, IsActive: false } }
        );
      }
      res.json(rowsUpdated);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error",
      });
    });
};

exports.createAppointment = (req, res) => {
  Appointment.create({
    AppUserID: req.body.AppUserID,
    ServiceProviderID: req.body.ServiceProviderID,
    AppointmentDate: req.body.AppointmentDate,
    StartTime: req.body.StartTime,
    EndTime: req.body.EndTime,
    TotalTime: req.body.TotalTime,
    Status: req.body.Status,
    PaymentMode: req.body.PaymentMode,
    TotalCost: req.body.TotalCost,
    IsPaid: req.body.IsPaid,
    AddressID: req.body.AddressID,
    ServiceID: req.body.ServiceID
  })
    .then((newpost) => {
      res.status(201).json({
        message: "Appointment created successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    });
};

exports.updateAppointment = function (req, res) {
  Appointment.update(
    {
      ServiceID: req.body.ServiceID,
      ServiceProviderID: req.body.ServiceProviderID,
      AppointmentDate: req.body.AppointmentDate,
      StartTime: req.body.StartTime,
      EndTime: req.body.EndTime,
      Status: req.body.Status,
      PaymentMode: req.body.PaymentMode,
      TotalCost: req.body.TotalCost,
      IsPaid: req.body.IsPaid,
    },
    { where: { id: req.params.AppointmentId } }
  )
    .then((rowsUpdated) => {
      res.json(rowsUpdated);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    });
};

exports.getAppointmentList = (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  Appointment.findAndCountAll({
    where: { AppUserID: req.params.AppUserID },
    attributes: [
      "AppUserID",
      "ServiceProviderID",
      "AppointmentDate",
      "Status",
      "PaymentMode",
      "TotalCost",
      "IsPaid",
    ],
    limit: pageSize,
    offset: pageSize * (currentPage - 1),
    //order: [Appointment.sequelize.col("AppointmentDate"), "DESC"],
    include: {
      model: ServiceProvider,
      required: true,
      attributes: ["AppUserID", "ServiceID"],
      include: [
        {
          model: User,
          required: true,
          attributes: ["FirstName", "LastName"],
        },
        { model: Service, required: true, attributes: ["ServiceName"] },
      ],
    },
  })
    .then((result) => {
      res.status(200).json({
        message: "Appointments extracted successfully",
        appointments: result.rows,
        count: result.count,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    });
};

exports.createAddress = (req, res) => {
  Address.create({
    AppUserID: req.body.AppUserID,
    DoorNo: req.body.DoorNo,
    Street1: req.body.Street1,
    Street2: req.body.Street2,
    Area: req.body.Area,
    City: req.body.City,
    State: req.body.State,
    Pincode: req.body.Pincode,
    ContactNo: req.body.ContactNo,
    AltContactNo: req.body.AltContactNo,
  })
    .then((newpost) => {
      res.status(201).json({
        message: "Address created successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    });
};

exports.updateAddress = (req, res) => {
  Address.update(
    {
      AppUserID: req.body.AppUserID,
      DoorNo: req.body.DoorNo,
      Street1: req.body.Street1,
      Street2: req.body.Street2,
      Area: req.body.Area,
      City: req.body.City,
      State: req.body.State,
      Pincode: req.body.Pincode,
      ContactNo: req.body.ContactNo,
      AltContactNo: req.body.AltContactNo,
    },
    { where: { id: req.params.AddressId } }
  )
    .then((newpost) => {
      res.status(201).json({
        message: "Address updated successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    });
};

exports.getAddressList = function (req, res) {
  const userId = +req.params.id;
  // const appointmentDate = +req.params.date;
  Address.findAll({
    where: { AppUserID: userId },
  })
    .then((result) => {
      res.status(200).json({
        message: "Addresses extracted successfully",
        addresses: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    });
};

exports.deleteAddress = function (req, res) {
  Address.destroy({ where: { id: req.params.AddressId } })
    .then(function (rowsDeleted) {
      if (rowsDeleted == 1) {
        console.log("Address deleted successfully");
      }
      res.json(rowsDeleted);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    });
};
