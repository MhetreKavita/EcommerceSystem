"use-strict";
const Variant = require("../models/variant.model");
exports.findAll = function (req, res) {
  Variant.findAll(function (err, variant) {
    console.log("controller");
    if (err) res.send(err);
    res.send(variant);
  });
};

exports.create = function (req, res) {
  const newVariant = new Variant(req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required fields" });
  } else {
    Variant.create(newVariant, function (err, variant) {
      if (err) res.send(err);
      
      res.json({
        error: false,
        message: "Product Variant added successfully!",
        data: variant,
      });
    });
  }
};

exports.findByProductId = function (req, res) {
    Variant.findByProductId(req.params.product_id, function (err, variant) {
      if (err) res.send(err);
      res.send(variant);
    });
  };

exports.findById = function (req, res) {
  Variant.findById(req.params.id, function (err, variant) {
    if (err) res.send(err);
    res.send(variant);
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required fields" });
  } else {
    Variant.update(
      req.params.id,
      new Variant(req.body),
      function (err, variant) {
        if (err) res.send(err);
        res.json({error:false,message:"Product variant updated successfully!",data:variant});
      }
    );
  }
};

exports.delete = function(req,res){
    Variant.delete(req.params.id,function(err,variant){
        if(err) res.send(err);
        res.json({error:false,message:"Product variant Deleted successfully!",data:variant});
    })
}
