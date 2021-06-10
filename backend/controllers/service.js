const Service = require("../models/dbSchema").serviceSchema;


// exports.addNewService = (req, res) => {
//   Service.create({
//     PricePerHour: req.body.PricePerHour,
//     ServiceName: req.body.ServiceName,
//     image: req.body.image,
//     IsActive: true,
//   })
//     .then((newpost) => {
//       res.status(201).json({
//         message: "Service added successfully",
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json({
//         message: error,
//       });
//     });
// };

exports.updateService = function (req, res) {
  Service.update(
    { IsActive: false },
    { where: { id: req.params.ServiceId, IsActive: true } }
  )
    .then(function (rowsUpdated) {
      if (rowsUpdated == 0) {
        Service.update(
          { IsActive: true },
          { where: { id: req.params.ServiceId, IsActive: false } }
        );
      }
      res.json(rowsUpdated);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    });
};

exports.deleteService = function (req, res) {
  Service.destroy({ where: { id: req.params.ServiceId, IsActive: false } })
    .then(function (rowsDeleted) {
      if (rowsDeleted == 1) {
        console.log("Service deleted successfully");
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

exports.getList = function (req, res) {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  console.log(req.query);

  Service.findAndCountAll({
    limit: pageSize,
    offset: pageSize * (currentPage - 1),
  })
    .then((result) => {
      res
        .status(200)
        .json({
          message: "Services extracted successfully",
          services: result.rows,
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

exports.getListForAppointment = function (req, res) {
  Service.findAndCountAll({
    where: { IsActive: true }
  })
    .then((result) => {
      res
        .status(200)
        .json({
          message: "Services extracted successfully",
          services: result.rows,
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

exports.getPricePerHour = function (req, res) {
  Service.findOne({
    attributes: ["PricePerHour"],
    where: { id: req.params.id },
  })
    .then((result) => {
      res
        .status(200)
        .json({
          message: "Price per hour extracted successfully",
          PricePerHour: result.PricePerHour,
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: error,
      });
    });
};
