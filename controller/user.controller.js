const User = require('../model/user.model');
const nodemailer = require('nodemailer');

exports.SignUp = (req,res,next)=>{
    console.log(req.body); 
    let user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.mobile = req.body.mobile;
    user.gender = req.body.gender;
    user.address = req.body.address;
    user.password = req.body.password;
    user.pincode = req.body.pincode;

 
    user.SignUp()
    .then(result=>{
      User.getCurrentUser(user.email)
      .then(results=>{
         req.session.current_user=results[0].id;
        let email = req.body.email;
        let password = req.body.password;
        let msg = email + " "+ password;
         const transport = nodemailer.createTransport({
             host : 'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{  
                user:'burghatepatil06@gmail.com',
                pass:'burghate.7'
            }
         });
         console.log(req.body.email);
         let mailOptions = {
             
             from : 'burghatepatil06@gmail.com',
             to : req.body.email,
             subject : "Your Credential",
             text : msg
             
         }

         transport.sendMail(mailOptions , (err,info)=>{
            if(err){
                console.log(err)
            }else{
                console.log('Email has been sended successfully please check your mail box thankyou');
            }
         })
         res.redirect("/");
       })   
      .catch();
    })
    .catch(err=>{
      console.log(err);   
    });
 };