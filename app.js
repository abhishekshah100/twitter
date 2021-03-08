const express = require('express');
const app = express();
const port = 3003;
const middleware = require('./middleware');
const loginRoute = require('./routes/loginRoutes');

const server = app.listen(port, ()=> console.log(`Server Listening the Port is ${port}`) );

app.set('view engine','pug');
app.set('views','views');

app.use("/login",loginRoute);

app.get('/',middleware.requireLogin,(req, res, next)=>{
    const payload = {
        pageTitle: 'Home Page Working'
    }
    //res.status(200).send('Yahoo!!!');
    res.status(200).render('home',payload);
});