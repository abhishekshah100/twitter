const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
let User = require('../schema/UserSchema');
const { post } = require('./registerRoutes');

app.set('view engine','pug');
app.set('views','views');

app.use(bodyParser.urlencoded({ extended: false}));

router.get('/', (req, res, next)=>{
    res.status(200).render('login');
});

router.post('/', async(req, res, next) => {
    let userName=req.body.loginUsername;
    let password=req.body.logPassword;
    var payload = req.body;
    if(userName && password)
    {
        var user = await User.findOne({
            $or : [
                { userName: userName},
                { email : userName }
            ]
        })
        .catch((error)=> {
            console.log(error);
            payload.errorMessage = "Something went wrong";
            res.status(200).render("login",payload);
        });
        if(user!=null)
        {
            //User found
            let result =await bcrypt.compare(password, user.password);
            if(result===true)
            {
                req.session.user=user;
                return res.redirect("/");
            }
            else
            {
                payload.errorMessage = "Password is incorrect";
            }
        }
        else
        {
            payload.errorMessage = "Email or UserName Does not exist Exists";
        }
    }
    else
    {
        payload.errorMessage = "Make sure each field has a valid value.";
    }
    return res.status(200).render("login",payload);
})

module.exports = router;