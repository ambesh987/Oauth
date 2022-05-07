
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const passport = require('./Authentication/googleLogin');
const { PATH } = require('./CommonLib/constant');
const userRoute = require('./Routes/user');
const authRoute = require('./Routes/auth.route');

app.use(bodyParser.json([]));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(passport.initialize());

//Set route for different module
app.use(PATH.USER, userRoute);
app.use(PATH.AUTH, authRoute);

module.exports = app;


// localhost:9008/user/user
