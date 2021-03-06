const db = require("../models");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Defining methods for the userController
module.exports = {
  create: function (req, res) {
    console.log(req.body)
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findUser: function (req, res) {
    db.User
      .find({ username: req.params.id })
      .then(results => res.json(results))
      .catch(err => res.status(422).json(err));
  },
  findEmail: function (req, res) {
    db.User
      .find({ email: req.params.id })
      .then(results => res.json(results))
      .catch(err => res.status(422).json(err));
  },
  updateUser: function (req, res) {
    console.log(req.params.olduser)
    db.User.updateOne({ username: req.params.olduser }, { username: req.params.newuser })
      .then(results => res.json(results))
      .catch(err => res.status(422).json(err));
  },
  updatePassword: function (req, res) {
    console.log(req.params.pass)
    db.User.updateOne({ username: req.params.user }, { password: req.params.pass })
      .then(results => res.json(results))
      .catch(err => res.status(422).json(err));
  },
  forgotPassword: function(req,res){
    console.log(req.body)
    db.User.updateOne({email: req.body.email}, {password: req.body.password})
    .then(results => {
      console.log(results)
    db.User.find({email: req.body.email})
    .then(results =>{
      console.log( "Hello " + results[0].email)
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: true,
        auth:{
          user: "noreply.macklist@gmail.com",
          pass: "Macklist1234"
        },
      })
      const message = {
        from: "noreply.macklist@gmail.com",
        to: `${results[0].email}`,
        subject: "User account information",
        text:
        "Your are receiving this email because you (or someone else) have requested this information. \n\n"
        + "username: " + `${results[0].username}\n`
        + "password: " + `${req.body.plainpass}\n\n`
        + "Note: Please change your password as soon as you get this email to secure your account!"
      };

      transporter.sendMail(message, (err, res) => {
        if(err){
          console.log(err)
        }else{
          res.json(results)
        }
      })
      res.json(results)
    }).catch(err => res.status(422).json(err));
  }).catch(err => res.status(422).json(err));

  }
};
