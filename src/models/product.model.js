'use-strict';

var dbConn = require('../../config/db.config');

var Product = function(product){
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
}

Product.create = function(newProduct,result){
    dbConn.query("INSERT INTO products set ?",newProduct,function(err,res){
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

Product.findByProductName = function(name,result){
    dbConn.query("select * from products as p join variants as v on p.id = v.product_id where p.name like ?","%"+name+"%",function(err,res){
        if(err){
            console.log('error :',err)
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}

Product.findByProductDesc = function(desc,result){
    dbConn.query("select * from products as p join variants as v on p.id = v.product_id where p.description like ?","%"+desc+"%",function(err,res){
        if(err){
            console.log('error :',err)
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}

Product.findByProductVariant = function(name,result){
    dbConn.query("select * from products as p join variants as v on p.id = v.product_id where v.variant_name like ?","%"+name+"%",function(err,res){
        if(err){
            console.log('error :',err)
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}

Product.findById = function(id,result){
    dbConn.query("select * from products as p join variants as v on p.id = v.product_id where id = ?",id,function(err,res){
        if(err){
            console.log('error :',err)
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}

Product.findAll = function(result){
    dbConn.query("select * from products",function(err,res){
        if(err){
            console.log('error :',err)
            result(err,null)
        }
        else{
            result(null,res)
        }
    });
};

Product.update = function(id,product,result){
    dbConn.query("UPDATE products set name = ?,description=?,price=? where id=?",[product.name,product.description,product.price,id],function(err,res){
        if(err) {
            console.log("error: ", err);
            result(null, err);
          }else{
            result(null, res);
          }
    });

};

Product.delete = function(id,result){
    dbConn.query("DELETE FROM products WHERE id=?",id,function(err,res){
        if(err) {
            console.log("error: ", err);
            result(null, err);
          }
          else{
            result(null, res);
          }
    });
};



module.exports = Product;

