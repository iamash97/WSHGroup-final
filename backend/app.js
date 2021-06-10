const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
//const mongoose = require("mongoose");
const app = express();

const userRoutes = require("./routes/user-route");
const serviceRoutes = require("./routes/service-route");
const serviceProviderRoutes = require("./routes/serviceProvider-route");
const appointmentRoutes = require("./routes/appointments-route");

/*mongoose.connect("mongodb://localhost:27017/demoDb")
.then(() => {
  console.log("Connection Established!!");
})
.catch(() => {
  console.log("Connection failed!!");
});

const Post = require('./models/post').Post;*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});


app.use("/user",userRoutes);
app.use("/service",serviceRoutes);
app.use("/serviceProvider",serviceProviderRoutes);
app.use("/appointment",appointmentRoutes);

module.exports = app;
