const sequelize = require("sequelize");
const con = new sequelize("wshgroup", "root", "Psiog@123", {
  host: "127.0.0.1",
  dialect: "mysql",
});

const userSchema = con.define("appusers", {
  FirstName: { type: sequelize.STRING, required: true },
  LastName: { type: sequelize.STRING },
  Age: { type: sequelize.INTEGER, required: true },
  Email: { type: sequelize.STRING, required: true },
  UsrPwd: { type: sequelize.STRING, required: true },
  UsrRole: { type: sequelize.INTEGER, required: true },
  IsActive: { type: sequelize.BOOLEAN, defaultValue: true },
});
userSchema.sync();

const serviceSchema = con.define("services", {
  ServiceName: { type: sequelize.STRING, required: true },
  PricePerHour: { type: sequelize.DECIMAL(10, 2), required: true },
  IsActive: { type: sequelize.BOOLEAN, defaultValue: true },
  image: { type: sequelize.STRING }
});
serviceSchema.sync();

const serviceProviderSchema = con.define("serviceproviders", {
  AppUserID: { type: sequelize.INTEGER },
  ServiceID: { type: sequelize.INTEGER },
  Availability: { type: sequelize.STRING, defaultValue: true },
  AverageRating: { type: sequelize.INTEGER },
  IsActive: { type: sequelize.BOOLEAN, defaultValue: true },
});
serviceProviderSchema.sync();

const ratingSchema = con.define("ratings", {
  ServiceProviderID: { type: sequelize.INTEGER },
  Rating: { type: sequelize.INTEGER, defaultValue: 0 },
  Comments: { type: sequelize.STRING },
});
ratingSchema.sync();

const addressSchema = con.define("addresses", {
  AppUserID: { type: sequelize.INTEGER },
  DoorNo: { type: sequelize.INTEGER },
  Street1: { type: sequelize.STRING(250) },
  Street2: { type: sequelize.STRING(250) },
  Area: { type: sequelize.STRING(250) },
  City: { type: sequelize.STRING(250) },
  State: { type: sequelize.STRING(250) },
  Pincode: { type: sequelize.BIGINT },
  ContactNo: { type: sequelize.BIGINT },
  AltContactNo: { type: sequelize.BIGINT },
});
addressSchema.sync();

const appointmentSchema = con.define("appointments", {
  AppUserID: { type: sequelize.INTEGER },
  ServiceID: { type: sequelize.INTEGER },
  ServiceProviderID: { type: sequelize.INTEGER },
  AppointmentDate: { type: sequelize.DATEONLY },
  StartTime: { type: sequelize.TIME },
  EndTime: { type: sequelize.TIME },
  TotalTime: { type: sequelize.INTEGER },
  Status: { type: sequelize.ENUM, values: [ 'In Progress', 'Closed', 'Cancelled'] },
  PaymentMode: { type: sequelize.ENUM, values: ['Online', 'Direct'] },
  TotalCost: { type: sequelize.DECIMAL(10, 2) },
  IsPaid: { type: sequelize.BOOLEAN, defaultValue: false },
  AddressID : { type: sequelize.INTEGER },
});
appointmentSchema.sync();

const invoiceSchema = con.define("invoices", {
  InvoiceDate: { type: sequelize.DATEONLY },
  AppointmentID: { type: sequelize.INTEGER },
});
invoiceSchema.sync();

userSchema.hasOne(serviceProviderSchema);
serviceProviderSchema.belongsTo(userSchema);

serviceSchema.hasMany(serviceProviderSchema);
serviceProviderSchema.belongsTo(serviceSchema);

serviceProviderSchema.hasMany(ratingSchema);
ratingSchema.belongsTo(serviceProviderSchema);

userSchema.hasMany(addressSchema);
addressSchema.belongsTo(userSchema);

userSchema.hasMany(appointmentSchema);
appointmentSchema.belongsTo(userSchema);

serviceProviderSchema.hasMany(appointmentSchema);
appointmentSchema.belongsTo(serviceProviderSchema);

appointmentSchema.hasOne(invoiceSchema);
invoiceSchema.belongsTo(appointmentSchema);

addressSchema.hasOne(appointmentSchema);
appointmentSchema.belongsTo(addressSchema);

serviceSchema.hasOne(appointmentSchema);
appointmentSchema.belongsTo(serviceSchema);

module.exports = {
  //con: con,
  userSchema: userSchema,
  serviceProviderSchema: serviceProviderSchema,
  serviceSchema: serviceSchema,
  ratingSchema: ratingSchema,
  addressSchema: addressSchema,
  appointmentSchema: appointmentSchema,
  invoiceSchema: invoiceSchema,
};
