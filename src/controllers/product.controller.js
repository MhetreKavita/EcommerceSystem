"use-strict";
const Product = require("../models/product.model");
exports.findAll = function (req, res) {
  Product.findAll(function (err, product) {
    console.log("controller");
    if (err) res.send(err);
    res.send(product);
  });
};

exports.create = function (req, res) {
  const newProduct = new Product(req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required fields" });
  } else {
    Product.create(newProduct, function (err, product) {
      if (err) res.send(err);
      //   res.send(product);
      res.json({
        error: false,
        message: "Product added successfully!",
        data: product,
      });
    });
  }
};

exports.findByProductName = function(req,res){
    console.log(req.body.name);
    console.log(req.body.type);
    if(req.body.type === "product_name"){
        Product.findByProductName(req.body.name,function(err,product){
            if (err) res.send(err);
            res.send(product);
        })
    }
    else if(req.body.type === "product_description"){
        
        Product.findByProductDesc(req.body.name,function(err,product){
            if (err) res.send(err);
            res.send(product);
        })
    }
    else if(req.body.type === "variant_name"){
        Product.findByProductVariant(req.body.name,function(err,product){
            if (err) res.send(err);
            res.send(product);
        })
    }
    else{
        res.json({message:'Invalid Search'})
    }
    
}

exports.findById = function (req, res) {
  Product.findById(req.params.id, function (err, product) {
    if (err) res.send(err);
    res.send(product);
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required fields" });
  } else {
    Product.update(
      req.params.id,
      new Product(req.body),
      function (err, product) {
        if (err) res.send(err);
        res.json({error:false,message:"Product updated successfully!",data:product});
      }
    );
  }
};

exports.delete = function(req,res){
    Product.delete(req.params.id,function(err,product){
        if(err) res.send(err);
        res.json({error:false,message:"Product Deleted successfully!",data:product});
    })
}
