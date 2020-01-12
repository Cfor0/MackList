const db = require("../models");

// Defining methods for the adController
module.exports = {
  findAll: function (req, res) {
    db.Ad
      .find(req.query)
      .sort({ _id: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  searchItem: function(req,res){
    console.log(req.body)
    db.Ad
    .find({$and:[req.body]})
    .sort({ _id: -1 })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  findLowPrice: function (req, res) {
    console.log(req.query)
    db.Ad
      .find({$and:[req.body]})
      .sort({productCost: 1})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findHighPrice: function (req, res) {
    db.Ad
      .find({$and:[req.body]})
      .sort({productCost: -1})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Ad
      .find({ _id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Ad
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    console.log("delete " + req)
    db.Ad
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateAd: function (req,res){
    console.log(req.body)
    db.Ad.updateOne({_id: req.body.id},{$set:{productTitle: req.body.productTitle, productImage: req.body.productImage,
      productDescription: req.body.productDescription,productCost: req.body.productCost}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
