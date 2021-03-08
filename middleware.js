exports.requireLogin = (req,res,next) => {
    if(res.session && res.session.user)
    {
        return next();
    }
    else
    {
        return res.redirect('login');
    }
}