const pool = require('../util/database_config');
module.exports = class Product{
    constructor (categoryId,productName,productPrice,productQty,frontImage ,backImage,leftImage,rightImage,productDescription){
        this.categoryId = categoryId;
        this.productName=productName;
        this.productPrice=productPrice;
        this.productQty=productQty;
        this.frontImage=frontImage;
        this.backImage=backImage;
        this.leftImage=leftImage;
        this.rightImage=rightImage;
        this.productDescription=productDescription;
    }

    // static fetchSelectedProducts(){
    //     return new Promise((rej,res)=>{
    //         pool.getConnection((err,con)=>{
    //             if(!err){
    //                 let sql = 'select * from product where category_id = ?';
    //                 con.query(sql,(err,results)=>{
    //                     con.release();
    //                     if(err){
    //                         rej(err);
    //                     }
    //                     else{
    //                         res(results);
    //                     }
    //                 });
    //             }
    //             else{
    //                 rej(err);
    //             }
    //         });
    //     });
    // }

    save(){
        return new Promise((res,rej)=>{
          pool.getConnection((err,con)=>{
              if(!err){
                 let sql = "insert into product(product_Name,price,quantity,product_Image1,product_Image2,product_Image3,product_Image4,description,category_id) values(?,?,?,?,?,?,?,?,?)";
                  con.query(sql,[
                      this.productName,
                      this.productPrice,
                      this.productQty,
                      this.frontImage,
                      this.backImage,
                      this.leftImage,
                      this.rightImage,
                      this.productDescription,
                      this.categoryId
                  ],(err,queryResult)=>{
                   con.release();   
                   err ? rej(err) : res(queryResult); 
                  });
              }
              else
               rej(err);
          })                
        });
    }
    static fetchALLProduct(){
        return new Promise((res,rej)=>{
            pool.getConnection((err,con)=>{
                if(err){
                    rej(err);
                }else{
                    let sql = 'select * from product';
                    con.query(sql,(err,results)=>{
                        con.release();
                        if(err){
                            rej(err);
                        }else{
                            res(results);
                        }

                    });
                }
            });
        });
    }
    static delete(id) {
        return new Promise((resolve, reject) => {
          pool.getConnection((err, con) => {
            if (!err) {
              let sql = "delete from product where id=?";
              con.query(sql,[parseInt(id)], (err, result) => {
                err ? reject(err) : resolve(result);
                con.release();
              })
    
            }
            else
              reject(err);
    
          });
    
        });
      }
    
      static fetchProductById(id) {
        return new Promise((resolve, reject) => {
          pool.getConnection((err, con) => {
            if (!err) {
              let sql = "select * from product where id=?";
              con.query(sql, [id * 1], (err, result) => {
                con.release();
              });
            }
            else
              reject(err);
          });
    
        });
      }
      update() {
        return new Promise((resolve, reject) => {
          pool.getConnection((err, con) => {
            if (!err) {
              let sql = "update product set product_Name=?, price=?,quantity=?,product_Image1=?,product_Image2=?,product_Image3=?,product_Image4=?,category_id=?,description=?";
    
              con.query(sql, [this.product_Name, this.price * 1, this.quantity * 1, this.product_Image1, this.product_Image2, this.product_Image3, this.product_Image4, this.category_id*1, this.description], (err, result) => {
                err ? reject(err) : resolve(result);
                con.release();
              });
            }
            else
              reject(err);
    
          });
    
        });
    
      }
    

}