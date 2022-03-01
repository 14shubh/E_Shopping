const pool = require('../util/database_config');

module.exports = class User{
    
    constructor(email,password,firstName,lastName,mobile,gender,address,pincode){
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.mobile = mobile;
        this.gender = gender;
        this.address = address;
        this.pincode = pincode;
    }
    
    
    CheckUser(){
        return new Promise((res,rej)=>{
            pool.getConnection((err,con)=>{
                if(err){
                    rej(err);
                }
                else{
                    let sql = 'select * from user where email = ? and password = ?';
                    con.query(sql, [this.email,this.password],(err,result)=>{
                        con.release();
                        if(err){
                            rej(err);
                        }
                        else{
                            res(result);
                        }
                    });
                }
            });
        });
    }
    static getCurrentUser(email){
        return new Promise((res,rej)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                   let sql = "select * from user where email=?";
                   con.query(sql,[email],(err,result)=>{
                     con.release();
                     if(err){
                         rej(err);
                     }else{
                         res(result);
                     }
                   });
                }
                else
                 reject(err);
            })
        });
    }
    SignUp(){
        return new Promise((res,rej)=>{
            pool.getConnection((err,con)=>{
                if(err){
                    console.log(err);
                }
                else{
                    let sql = 'insert into user (fname,lname,email,mobile,password,gender,address,pincode) values(?,?,?,?,?,?,?,?)';
                    con.query(sql,[this.firstName,this.lastName,this.email,this.mobile,this.password,this.gender,this.address,this.pincode],(err,result)=>{
                        con.release();
                        if(err){
                            rej(err);
                        }else{
                            res(result);
                        }
                    });
                }
            });
        });
    }
    
}