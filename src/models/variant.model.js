'use-strict';

var dbConn = require('../../config/db.config');

var Variant = function(variant){
    this.variant_name = variant.variant_name;
    this.variant_sku = variant.variant_sku;
    this.additional_cost = variant.additional_cost;
    this.stock_count = variant.stock_count;
    this.product_id = variant.product_id;
}

Variant.create = function(newvariant,result){
    dbConn.query("INSERT INTO variants set ?",newvariant,function(err,res){
        if(err){
            console.log('error : ',err)
            result(err,null)
        }
        else{
            console.log(res.insertId);
            result(null,res.insertId);
        }
    })
}

Variant.findByProductId = function(id,result){
    dbConn.query("select * from variants where product_id = ?",id,function(err,res){
        if(err){
            console.log('error :',err)
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}

Variant.findById = function(id,result){
    dbConn.query("select * from variants where id = ?",id,function(err,res){
        if(err){
            console.log('error :',err)
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}

Variant.findAll = function(result){
    dbConn.query("select * from variants",function(err,res){
        if(err){
            console.log('error :',err)
            result(err,null)
        }
        else{
            result(null,res)
        }
    });
};

Variant.update = function(id,variant,result){
    dbConn.query("UPDATE variants set variant_name = ?,variant_sku=?,additional_cost=?,stock_count=?,product_id=? where id=?",[variant.variant_name,variant.variant_sku,variant.additional_cost,variant.stock_count,variant.product_id,id],function(err,res){
        if(err) {
            console.log("error: ", err);
            result(null, err);
          }else{
            result(null, res);
          }
    });

};

Variant.delete = function(id,result){
    dbConn.query("DELETE FROM variants WHERE id=?",id,function(err,res){
        if(err) {
            console.log("error: ", err);
            result(null, err);
          }
          else{
            result(null, res);
          }
    });
};

module.exports = Variant;

