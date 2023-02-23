const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeNumber: {
    type: Number,
    required: true
  },
  adharCardNumber: {
    type: Number,
    required: true
  },
  mobileNumber: {
    type: Number,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
