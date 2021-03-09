const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

app.set('view engine','pug');
app.set('views','views');

app.use(bodyParser.urlencoded({ extended: false}));

router.get('/', (req, res, next)=>{
    res.status(200).render('register');
});

router.post('/', (req,res, next)=> {
    console.log(req.body);
    let firstName=req.body.firstName.trim();
    let lastName=req.body.lastName.trim();
    let userName=req.body.userName.trim();
    let email=req.body.email.trim();
    let password=req.body.password;
    var payload = req.body;
    if(firstName && lastName && userName && password)
    {
        console.log('success');
    }
    else
    {
        payload.errorMessage = "Make sure each field has a valid value.";
        res.status(200).render("register",payload);
    }
});

module.exports = router;