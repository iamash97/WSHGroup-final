const ServiceProvider = require("../models/dbSchema").serviceProviderSchema;
const Service = require("../models/dbSchema").serviceSchema;
const Rating = require("../models/dbSchema").ratingSchema;
const User = require("../models/dbSchema").userSchema;
const Invoice = require("../models/dbSchema").invoiceSchema;

exports.registerNew = (req, res) => {
  ServiceProvider.findOrCreate({
    where: {
      //object containing fields to found
      AppUserID: req.body.AppUserID,
      ServiceID: req.body.ServiceID,
    },
    defaults: {
      AppUserID: req.body.AppUserID,
      ServiceID: req.body.ServiceID,
      IsActive: req.body.IsActive,
    },
  })
    .then((result) => {
      objFinal = JSON.parse(JSON.stringify(result));
      if (!objFinal[0].IsActive) objFinal[0].IsActive = true;
      /* Rating.create({
        ServiceProviderID: req.body.UserID
      })
        .then(() => {
          // res.status(201).json({
          //   message: "ServiceProvider registered successfully",
          // });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({
            message: "Error",
          });
        });*/
      res.status(201).json({
        message: "ServiceProvider registered successfully",
        result: objFinal,
      });
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

  ServiceProvider.findAndCountAll({
    limit: pageSize,
    offset: pageSize * (currentPage - 1),
    attributes: ["id", "ServiceID"],
    include: [
      {
        model: User,
        required: true,
        attributes: ["FirstName", "LastName", "Age", "Email"],
      },
      {
        model: Service,
        required: true,
        attributes: ["id", "ServiceName", "PricePerHour"],
      },
      {
        model: Rating,
        attributes: [
          "ServiceProviderID",
          [
            Rating.sequelize.fn("AVG", Rating.sequelize.col("ratings.Rating")),
            "ratingAvg",
          ],
        ],
        group: ["ServiceProviderID", "ServiceID"],
        order: [
          [Rating.sequelize.fn("AVG", Rating.sequelize.col("Rating")), "DESC"],
        ],
      },
    ],
  })
    .then((result) => {
      res.status(200).json({
        message: "Service Providers extracted successfully",
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

exports.createInvoice = (req, res) => {
  Invoice.create({
    InvoiceDate: req.body.InvoiceDate,
    AppointmentID: req.body.AppointmentID,
  })
    .then((newpost) => {
      res.status(201).json({
        message: "Invoice created successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    });
};

//service list for each service provider
// exports.getRegServiceList = (req, res) => {
//   const serviceProviderId = +req.params.id;
//   Service.findAll({
//     attributes: ["id", "ServiceName", "PricePerHour"],
//     include: [
//       {
//         model: ServiceProvider,
//         required: true,
//         attributes: ["ServiceID", "IsActive"],
//         where: {
//           AppUserID: serviceProviderId,
//         },
//       },
//     ],
//   })
//     .then((result) => {
//       res.status(200).json({
//         result,
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json({
//         message: error,
//       });
//     });
// };

exports.getRegServiceList = (req, res) => {
  const serviceProviderId = +req.params.id;
  ServiceProvider.findAll({
    attributes: ["id", "AppUserID", "ServiceID", "IsActive"],
    where: { AppUserID: serviceProviderId },
    include: {
      model: Service,
      required: true,
      attributes: ["ServiceName", "PricePerHour"],
    },
  })
    .then((result) => {
      result = JSON.parse(JSON.stringify(result));
      result.forEach((element) => {
        element.PricePerHour = element.service.PricePerHour;
        element.ServiceName = element.service.ServiceName;
        delete element.service;
      });
      res.status(200).json({
        result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    });
};

//Update the IsActive state of Service for a particular Service Provider
exports.updateSpService = function (req, res) {
  ServiceProvider.update(
    { IsActive: false },
    { where: { id: req.params.spsId, IsActive: true } }
  )
    .then(function (rowsUpdated) {
      if (rowsUpdated == 0) {
        ServiceProvider.update(
          { IsActive: true },
          { where: { id: req.params.spsId, IsActive: false } }
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
