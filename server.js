const express = require('express');
const path = require('path');
const body_parser = require('body-parser');
const adminRouter = require('./routes/admin.route');
const session=require('express-session');
const userRouter = require('./routes/user.route');
const categoryRouter = require('./routes/category.routes');
const indexRouter = require('./routes/index.route');
const productRouter = require('./routes/product.route');
const fileupload = require('express-fileupload');
const port = 3001;
const app = express();

app.set('view engine', 'ejs');

app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'ramshreeram'
}));
app.use(fileupload());
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use("/category",categoryRouter);
app.use('/product',productRouter);
app.use(indexRouter);

app.listen(port, (err) => {
    err ? console.error(err) : console.log('listening on port localhost:' + port);
})