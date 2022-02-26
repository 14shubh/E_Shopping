const product = require('../model/product.model');
const Category = require('../model/category.model');

exports.add_productPage = (req,res,next)=>{
    Category.fetchAllCategory().then((results)=>{
        res.render('admin_views/add_product.ejs',{
            title : 'Add Product',
            CategoryList : results
        });
    }).catch((err)=>{
        console.log(err);
    });
};
