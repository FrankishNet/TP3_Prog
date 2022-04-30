const User = require("../model/user");
const passport = require("passport");

module.exports = {

    saveUser: (req, res, next) => {

        if (req.skip)
            next();

        let userParams = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        const newUser = new User(userParams);
        User.register(newUser, req.body.password, (error, user) => {
            if (error) {
                console.log(error);
                req.flash("error_msg", "Failed to create your account !");
                res.locals.redirect = "/signup";
                next();
            } else {
                req.flash("success_msg", "Account sucessfully created !");                
                res.locals.redirect = "/";
                next();
            }

        });
    },

    redirectView: (req, res) => {
        const redirectPath = res.locals.redirect;
        if (redirectPath)
            res.redirect(redirectPath);
    },

    new: (req, res) => {
        res.render("signup");
    },

    login: (req, res) => {
        res.render("login");
    },

    isUserAthenticated: (req, res, next)=>  {
        console.log("isUserAthenticated :: Checking if user is authenticated");
        if(!req.isAuthenticated()){
            console.log("isUserAthenticated :: not authenticated");
            req.flash("error_msg", "You must be authenticated first.");
            res.redirect('/login');
        } else{
            console.log("isUserAthenticated :: authenticated");
            next();
        }  
    },

  //  authenticAction: (req, res, next)=> {
  //      passport.authenticate('local', { failureRedirect: '/login', failureMessage: true })
  //  }
};