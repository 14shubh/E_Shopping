const Category = require('../model/category.model');

exports.indexPage = (req, res, next) => {
    res.render('index.ejs', {
        title: 'Divine Electronic'
    });
}

exports.signinPage = (req, res, next) => {
    res.render('login',{
        title:'Sign In'
    });
}

exports.signupPage = (req, res, next) => {
    res.render('registration.ejs',{
        title:"Registration"
    });
}

exports.indexPage = (req,res,next)=>{
    Category.fetchAllCategory().then((results)=>{
        
        return res.render('index.ejs',{
            title:'Home Page',
            CategoryList:results
        });
    }).catch((err)=>{
        console.log(err);
    })
}
