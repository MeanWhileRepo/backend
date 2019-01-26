"use strict";
var mongoose = require("mongoose");
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

module.exports = module.exports = mongoose.model("User", User);
