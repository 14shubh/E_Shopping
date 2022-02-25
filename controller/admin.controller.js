const Admin = require('../model/admin.model');
exports.adminLoginPage = (request, response, next) => {
    response.render("admin_views/login.ejs", {
        title: "Login"
    });
};
exports.adminDashBoard = (request, response, next) => {
    response.render('admin_views/Admin_Dashboard.ejs', {
        title: "Dashboard"
    });
}
exports.adminLoginPost = (request, response, next) => {
    const email = request.body.email;
    const password = request.body.password;
    let admin = new Admin(email, password);
    admin.checkAdmin().then(results => {
        if (results.length > 0) {
            request.session.currentUser = email;
            response.redirect("/admin/dashboard");
        } else
            console.log("Login Failed...");
    }).catch(err => {
        console.log(err);
    });
};
exports.adminSignout =(req,res,next)=>{
    req.session.currentUser = null;
    req.session .destroy();
    res.redirect("/admin/");
}