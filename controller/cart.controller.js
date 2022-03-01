const Cart = require('../model/cart.model');

exports.viewCart = (req,res,next)=>{
  let user_Id = req.session.Current_User;
  Cart.FetchAllCartItems(user_Id)
  .then(results=>{
      console.log(results);
      res.render("view-cart.ejs",{
          title: "Cart",
          cartItemList: results,
          isLoggedIn: req.session.Current_User
      });
  })
  .catch();
}
exports.AddtoCart = (req,res,next)=>{
   let cart = new Cart(); 
   cart.productId = req.params.pid;
   cart.user_Id = req.session.Current_User; 
   cart.AddItemToCart()
   .then(result=>{
     return res.json({
         message: "success"
     });
   })
   .catch(err=>{
     return res.json({
         message: "error"
     })
   });
}
exports.cartItem = (req,res,next)=>{
  let user_Id = req.session.Current_User;
  Cart.FetchAllCartItems(user_Id)
  .then(results=>{
      return res.json(results);
  })
  .catch((err)=>{
    console.log(err);
  });
}




exports.RemoveFromCart = (req,res,next)=>{
    let cart = new Cart(); 
    cart.productId = req.params.pid;
    cart.user_Id = req.session.Current_User;
    console.log(req.session.Current_User); 
    cart.RemoveFromCart()
    .then(result=>{
      return res.json({
          message: "success"
      });
    })
    .catch(err=>{
      return res.json({
          message: "error"
      })
    });
}