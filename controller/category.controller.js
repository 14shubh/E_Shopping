const Category = require("../model/category.model");
const path = require("path");

// exports.addCategory = (request, response, next) => {
//   const file = request.files.categoryImage;
//   const fileName = new Date().getTime() + file.name;
//   if (file) {
//     const filePath = path.join(__dirname, "../", "public/images", fileName);
//     file.mv(filePath, (err) => {
//       if (!err) {
//         if (request.body.categoryName && file) {
//           let category = new Category(request.body.categoryName, fileName);
//           category
//             .save()
//             .then((result) => {
//               response.redirect("/admin/dashboard");
//             })
//             .catch((err) => {
//               response.send("Erro.........");
//             });
//         }
//       } else response.send("Error.........");
//     });
//   }
// };

exports.addCategory = (request, response, next) => {
  
  console.log(request.body);
  console.log(request.file);  
  let category = new Category();
  category.categoryName = request.body.categoryName;
  category.categoryImage = request.file.filename;
  category.save()
    .then((result) => {
      
      response.redirect("/admin/dashboard");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.categoryLits = (req, res, err) => {
  Category.fetchAllCategory()
    .then((results) => {
      console.log(results);
      
      res.render("admin_views/category_list.ejs", {
        categoryList: results,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
