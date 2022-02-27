const pool = require('../util/database_config.js');
module.exports = class Category {
    constructor(categoryName, categoryImage) {
        this.categoryName = categoryName;
        this.categoryImage = categoryImage;
    }
    static fetchAllCategory(){
        return new Promise((resolve,reject)=>{  
           pool.getConnection((err,con)=>{
             if(!err){
               let sql = "select * from category";
               con.query(sql,(err,Results)=>{
                  con.release();
                  err ? reject(err) : resolve(Results);
               });
             }
             else 
               reject(err);
           }); 
        });
    }
    save() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
              if(!err){  
               let sql = "insert into category(category_Name,category_Image) values(?,?)";
               con.query(sql,[this.categoryName,this.categoryImage],(err,Result)=>{
                 con.release(); 
                 err ? reject(err) : resolve(Result);
               });
              }
              else 
                reject(err);
            });
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {

            });
        });
    }
    update() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {

            });
        });
    }
    categoryById(id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {

            });
        });
    }
    categoryList() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {

            });
        });
    }
}