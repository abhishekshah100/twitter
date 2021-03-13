const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
let User = require('../schema/UserSchema');

app.set('view engine','pug');
app.set('views','views');

app.use(bodyParser.urlencoded({ extended: false}));

router.get('/', (req, res, next)=>{
    res.status(200).render('register');
});

router.post('/', async (req,res, next)=> {
    let firstName=req.body.firstName.trim();
    let lastName=req.body.lastName.trim();
    let userName=req.body.userName.trim();
    let email=req.body.email.trim();
    let password=req.body.password;
    var payload = req.body;
    if(firstName && lastName && userName && email && password)
    {
        var user = await User.findOne({
            $or : [
                { userName: userName},
                { email : email }
            ]
        })
        .catch((error)=> {
            console.log(error);
            payload.errorMessage = "Something went wrong";
            res.status(200).render("register",payload);
        });
        if(user==null)
        {
            //No User found
            var data = req.body;
            data.password =await bcrypt.hash(password,10);
            User.create(data)
            .then((user) => {
               console.log("create");
               req.session.user=user;
               return res.redirect("/");
            })
        }
        else
        {
            //User found
            if(email==user.email)
            {
                payload.errorMessage = "Email Already Exists";
            }
            else{
                payload.errorMessage = "UserName Already Exists";
            }
            res.status(200).render("register",payload);
        }
    }
    else
    {
        payload.errorMessage = "Make sure each field has a valid value.";
        res.status(200).render("register",payload);
    }
});

module.exports = router;