var express = require('express');
var router = express.Router();

var passport = require('passport');



// middleware routes / controllers
router.use('/', require('./home'));
router.use('/singlevideo', require('./singlevideo'));
router.use('/upload', require('./upload'));
router.use('/submit', require('./submit'));

router.use('/videos', require('./videos'));


// // default routes
// router.get('/', function(req, res, next) {
// 	// all concepts from model
// 	res.render('home');
// });

router.get('/about', function(req, res, next) {
	res.render('about', {
		title: 'gray'
	});
});



router.get('/ask', function(req, res, next) {
    res.statusCode = 302;
    var google_form_url = 'https://docs.google.com/forms/d/e/1FAIpQLSfGHOq3UKNggSC6FIDFymgmzdggMdQY3IqF0nPXUgu32vt62w/viewform' 
    res.setHeader("Location", google_form_url);
    res.end();

});





// show the login form
router.get('/login', function(req, res) {

    // render the page and pass in any flash data if it exists
    // res.render('login.hbs', { message: req.flash('loginMessage') }); 
    res.render('login.hbs'); 
});

// process the login form
// app.post('/login', do all our passport stuff here);

// =====================================
// SIGNUP ==============================
// =====================================
// show the signup form
router.get('/signup', function(req, res) {

    // render the page and pass in any flash data if it exists
    // res.render('signup.ejs', { message: req.flash('signupMessage') });
    res.render('signup.hbs');
});

// process the signup form
// app.post('/signup', do all our passport stuff here);

// =====================================
// PROFILE SECTION =====================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.hbs', {
        user : req.user // get the user out of session and pass to template
    });
});

// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
};



  // process the signup form
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));


// process the login form
router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/submit', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));


router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

// the callback after google has authenticated the user
router.get('/auth/google/callback',
    passport.authenticate('google', {
            successRedirect : '/submit',
            failureRedirect : '/'
}));


module.exports = router




