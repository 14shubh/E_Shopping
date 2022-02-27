const pool = require('../util/database_config');
module.exports = class Product{
    constructor (categoryId){
        this.categoryId = categoryId;
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
                      this.productPrice*1,
                      this.productQty*1,
                      this.frontImage,
                      this.backImage,
                      this.leftImage,
                      this.rightImage,
                      this.productDescription,
                      this.categoryId*1
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
}