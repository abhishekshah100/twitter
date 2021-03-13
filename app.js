const express = require('express');
const app = express();
const port = 3003;
const middleware = require('./middleware');
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');
const path = require('path');
const mongoose = require('./database');
const bodyParser = require('body-parser');
const session = require("express-session");

const server = app.listen(port, ()=> console.log(`Server Listening the Port is ${port}`) );

app.set('view engine','pug');
app.set('views','views');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname,"public")));

app.use(session({
    secret: "bbq chips",
    resave: true,
    saveUninitialized: false
}))

app.use("/login",loginRoute);
app.use("/register",registerRoute);

app.get("/",middleware.requireLogin, (req, res, next)=>{
    var payload = {
        pageTitle: 'Home Page Working',
        userLoggedIn: req.session.user
    }
    //res.status(200).send('Yahoo!!!');
    res.status(200).render('home',payload);
});