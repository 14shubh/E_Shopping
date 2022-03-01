const Product = require('../model/product.model');
const Category = require('../model/category.model');



// exports.viewProducthomePage=(req,res,next)=>{
//     let product = new Product();
//     product.cid = req.params.cid;

//     product.fetchSelectedProducts().then((results)=>{
        
//         console.log(results);
//         res.render('index.ejs',{
//             title: 'Home Page',
            
//         })
//     }).catch((err)=>{
//         console.log(err);
//     });
// };

// exports.saveProduct = (req,res,next)=>{
//     let product = new Product();
//     product.FrontImage = "";
//     product.BackImage = "";
//     product.LeftImage = "";
//     product.RightImage = "";

//     if(req.files.length>0){
//         product.FrontImage = req.files[0].filename;
//         if(req.files.length > 1){
//             product.BackImage = req.files[1].filename;
//             if(req.files.length > 2){
//                 product.LeftImage = req.files[2].filename;
//                 if(req.files.length > 3){
//                     product.RightImage = req.files[3].filename;
//                 }
//             }
//         }
//     }
//     product.categoryId = req.body.categoryId;
//     product.productName = req.body.productName;
//     product.productPrice = req.body.productPrice;
//     product.productQuantity = req.boby.productQuantity;
//     product.productDescription = req.body.productDescription;
//     product.save().then((results)=>{
//         res.render('admin_views/Admin_Dashboard.ejs');
//     }).catch((err)=>{
//         console.log(err);
//     });
// }

exports.saveProduct  = (request,response,next)=>{
    let product = new Product();
    product.frontImage = "";
    product.backImage = "";
    product.leftImage = "";
    product.rightImage = "";
    if(request.files.length>0){
       product.frontImage = request.files[0].filename;
       if(request.files.length>1){
           product.backImage = request.files[1].filename;
           if(request.files.length>2){
               product.leftImage = request.files[2].filename;
               if(request.files.length>3){
                   product.rightImage = request.files[3].filename;
               }
           }
       }
    }
    product.categoryId  = request.body.categoryId;
    product.productName = request.body.productName;
    product.productQty = request.body.Quantity;
    product.productDescription = request.body.Description;
    product.productPrice = request.body.Price;
    
    product.save()
    .then(result=>{
        return response.redirect("/admin/dashboard");
    })
    .catch(err=>{
        console.log(err);
        return response.send("Error....");
    });
}
exports.add_productPage = (request,response,next)=>{
    Category.fetchAllCategory()
    .then((results)=>{
        response.render('admin_views/add_product.ejs',{
            title : 'Add Product',
            CategoryList : results
        });
    }).catch((err)=>{
        console.log(err);
    });
};

exports.productList = (request, response, next) => {
    Product.fetchALLProduct()

    
      .then((results) => {
          console.log(results);
        response.render('admin_views/product_list.ejs', {
          productList: results,
          title:'View Product',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.updateProduct =  (request,response,next)=>{
    Product.update()
     
      .then(result=>{
        response.redirect("/admin_views/edit_product.ejs");
     }).catch(err=>{
        console.log(err);
        response.send("Error.....");
     });
  };
  exports.getProductById = (request,response,next)=>{
    Product.fetchProductById(request.params.productId)
    .then(result=>{
      if(result.length>0){
         response.render('/admin_views/edit_product.ejs',{
            title:'View-Product',
            productList: result[0]
         });
      }
    })
    .catch(err=>{
       console.log(err);
    });
 };
 exports.deleteProduct = (request,response,next)=>{
    const pid = request.params.id;
    Product.delete(pid).then(
        ()=>{
          console.log(pid);
            response.redirect("/product/product_list");
          // response.send("Product Deleted...");x
        }
    ).catch();
 };

  