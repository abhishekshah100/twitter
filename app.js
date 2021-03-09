const express = require('express');
const app = express();
const port = 3003;
const middleware = require('./middleware');
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect("mongodb+srv://admin:dbUserPassword@twittercluster.q33bm.mongodb.net/Twitter?retryWrites=true&w=majority")
        .then(()=>{ console.log('Database Connection successful')})
        .catch((err) => { console.log('Database Connection error '+err)})

const server = app.listen(port, ()=> console.log(`Server Listening the Port is ${port}`) );

app.set('view engine','pug');
app.set('views','views');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname,"public")));

app.use("/login",loginRoute);
app.use("/register",registerRoute);

app.get('/',middleware.requireLogin,(req, res, next)=>{
    const payload = {
        pageTitle: 'Home Page Working'
    }
    //res.status(200).send('Yahoo!!!');
    res.status(200).render('home',payload);
});