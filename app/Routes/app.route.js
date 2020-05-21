// Importing important packages
const express = require("express");
// Using express and routes
const jwt = require("jsonwebtoken");
const randtoken = require("rand-token");
let nodemailer = require("nodemailer");
const appRoute = express.Router();

// Employee module which is required and imported
let bookingrequestModel = require("../Model/BookingRequest");
let loginRequestModel = require("../Model/LoginRequest");
let RoomTypeModel = require("../Model/RoomTypeModel");

// To Get List Of Employees
appRoute.route("/bookings").get((req, res) => {
  bookingrequestModel.find(function(err, bookings) {
    if (err) {
      console.log(err);
    } else {
      res.json(bookings);
    }
  });
});

// To Add New Employee
appRoute.route("/addBooking").post((req, res) => {
  let request = new bookingrequestModel(req.body);
  request
    .save()
    .then(game => {
      res.status(200).json({ request: "Booking Added Successfully" });
      //sentMail(request);
    })
    .catch(err => {
      res.status(400).send("Something Went Wrong");
    });
});

// To Delete booking
appRoute.route("/deleteBooking/:id").get(function(req, res, next) {
  let request = bookingrequestModel;
  request.findByIdAndRemove({ _id: req.params.id }, function(err, employee) {
    if (err) res.json(err);
    else res.json("Employee Deleted Successfully");
  });
});

//user actions
// To Add new user
appRoute.route("/addUser").post((req, res) => {
  let request = new loginRequestModel(req.body);
  console.log(request);
  request
    .save()
    .then(game => {
      res.status(200).json({ request: "User Added Successfully" });
    })
    .catch(err => {
      res.status(400).send("Something Went Wrong");
    });
});

//list users
appRoute.route("/users").get((req, res) => {
  loginRequestModel.find(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

//authenticate
appRoute.route("/authenticate").post((req, res) => {
  console.log("before", req.body);
  loginRequestModel.findOne(
    { username: req.body.username, password: req.body.password },
    (user, err) => {
      console.log(err);

      if (err == null) {
        res.json({ status: "error", error: "No User found" });
      } else {
        const refreshToken = randtoken.uid(256);
        jwt.sign({ user }, "secretkey", { expiresIn: "1hr" }, (err, token) => {
          res.json({ jwt: token, refreshToken: refreshToken });
        });
      }
    }
  );
});

// To Add New Room
appRoute.route("/addRoom").post((req, res) => {
  let request = new RoomTypeModel(req.body);
  request
    .save()
    .then(game => {
      res.status(200).json({ request: "Room Added Successfully" });
      sentMail(request);
    })
    .catch(err => {
      res.status(400).send("Something Went Wrong");
    });
});

//list rooms
appRoute.route("/listRooms").get((req, res) => {
  RoomTypeModel.find(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

appRoute.route("/deleteUser/:id").get(function(req, res, next) {
  loginRequestModel.findByIdAndRemove({ _id: req.params.id }, function(
    err,
    employee
  ) {
    if (err) res.json(err);
    else res.json("Employee Deleted Successfully");
  });
});

function sentMail(request) {
  console.log(request);
  let transporter = nodemailer.createTransport({
    service: "Yahoo",
    auth: {
      user: "akhilmekkatt@yahoo.com",
      pass: "DONalive1"
    }
  });
  var mailOptions = {
    from: "akhilmekkatt@yahoo.com",
    to: "akhilmekkatt@gmail.com",
    subject: "Congratulations Your booking added at Hotel New Castle",
    text:
      "Your booking added at Hotel New Castle, on 21 december 2018 to 1st of january 2019"
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
//token verification function
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader != "undefined") {
    console.log(bearerHeader);
    req.token = bearerHeader.split(" ")[1];
    next();
  } else {
    res.json({
      message:
        "Dont try to fool us. We are too smart. You dont have access to see this."
    });
  }
}

module.exports = appRoute;
