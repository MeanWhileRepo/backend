"use strict";
var mongoose = require("mongoose");
var sha1 = require("sha1");
var bcrypt = require("bcrypt-nodejs");
var validator = require("../utils/validator");
var Schema = mongoose.Schema;

var User = new Schema({
  uuid: {
    type: Number,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    validate: [validator.isName, "Invalid first name"]
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    validate: [validator.isName, "Invalid last name"]
  },
  fullName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, "Invalid email address"]
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String
  },
  create_ts: {
    type: Date,
    required: true
  },
  last_update_ts: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    uppercase: true,
    default: "INACTIVE",
    enum: ["INACTIVE", "ACTIVE", "SUSPENDED"]
  }
});

// Pre-Processing before saving document
User.pre("save", function(next) {
  var doc = this;
  var salt = bcrypt.genSaltSync(10);

  if (!doc.isModified("last_update_ts")) doc.last_update_ts = Date.now();

  // encrypt password before save
  if (doc.isModified("password")) {
    doc.salt = salt;
    doc.password = sha1(doc.password + salt);
  }

  // full name from first name and last Name
  if (doc.isModified("firstName") || doc.isModified("lastName")) {
    doc.full_name = doc.firstName + " " + doc.lastName;
  }

  next();
});

module.exports = module.exports = mongoose.model("User", User);
