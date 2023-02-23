const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Employee = require('./employee');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const ObjectId = mongoose.Types.ObjectId;
require('dotenv').config();

//cors error
app.use(cors());

//middleware
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});



// Configure the body-parser middleware to handle JSON data
app.use(bodyParser.json());

// Connect to database
mongoose.connect(process.env.mongo_uri, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB server');
  })
  .catch(err => {
    console.error(err);
  });

// Get all employees
app.get('/api/employees', (req, res) => {
  Employee.find({}, (err, employees) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.send(employees);
    }
  });
});

// Get a single employee by employee number
app.get('/api/employees/:employeeNumber', (req, res) => {
  const employeeNumber = req.params.employeeNumber;
  Employee.findOne({ employeeNumber }, (err, employee) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else if (!employee) {
      res.status(404).send(`Employee with employee number ${employeeNumber} not found`);
    } else {
      res.send(employee);
    }
  });
});


// Create a new employee
app.post('/api/employees', (req, res) => {
  const employee = new Employee(req.body);
  employee.save((err, savedEmployee) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.send(savedEmployee);
    }
  });
});

// Update an existing employee
app.put('/api/employees/:employeeNumber', (req, res) => {
  const employeeNumber = req.params.employeeNumber;
  const updatedEmployee = req.body;
  Employee.findOneAndUpdate({ employeeNumber }, updatedEmployee, { new: true }, (err, employee) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else if (!employee) {
      res.status(404).send(`Employee with employee number ${employeeNumber} not found`);
    } else {
      res.send(employee);
    }
  });
});


// Delete an existing employee
app.delete('/api/employees/:employeeNumber', (req, res) => {
  const employeeNumber = req.params.employeeNumber;
  Employee.findOneAndDelete({ employeeNumber }, (err, employee) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    } else if (!employee) {
      res.status(404).json({ error: `Employee with employeeNumber ${employeeNumber} not found` });
    } else {
      res.json({ message: `Employee with employeeNumber ${employeeNumber} deleted` });
    }
  });
});





    
    // Start the server
    app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    });