const pool = require('../util/database_config');
module.exports = class Cart{
    constructor(productId,user_Id){
        this.productId = productId;
        this.user_Id = user_Id;
    }
    static FetchAllCartItems(user_Id){
       return new Promise((res,rej)=>{
        pool.getConnection((err,con)=>{
          if(!err){
            let sql = "select product.id,product.product_Name,product.price,product.quantity,product.description,product.product_Image1,cart.id as cartId from product inner join cart on product.id = cart.product_id where cart.user_id = ?";
            con.query(sql,[user_Id*1],(err,results)=>{
              con.release();
              err ? rej(err) : res(results);
            });    
          }
          else
            rej(err);
        });
       });
    }
    RemoveFromCart(){
        return new Promise((res,rej)=>{
             pool.getConnection((err,con)=>{
               if(!err){
                 let sql = "delete from cart where product_id=? and user_id=?";
                 con.query(sql,[this.productId,this.user_Id],(err,result)=>{
                    con.release();
                    err ? rej(err) : res(result);
                 });
               }
               else
                 rej(err);
             });
        });   
     }
    AddItemToCart(){
       return new Promise((res,rej)=>{
            pool.getConnection((err,con)=>{
              if(!err){
                let sql = "insert into cart(product_id,user_id) values(?,?)";
                con.query(sql,[this.productId,this.user_Id],(err,result)=>{
                   con.release();
                   err ? rej(err) : res(result);
                });
              }
              else
                rej(err);
            });
       });   
    }
}