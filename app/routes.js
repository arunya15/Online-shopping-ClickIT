//app/routes.js

var myModule = require('./models/productDetail');
var details = myModule.details;

module.exports = function(app, passport) {

   // =====================================
   // HOME PAGE (with login links) ========
   // =====================================
   app.get('/', function(req, res) {
       res.render('index.ejs'); // load the index.ejs file
   });

   app.get('/woman', function(req, res) {
    res.render('woman.ejs'); // load the index.ejs file
});

    app.get('/man', function(req, res) {
       res.render('man.ejs'); // load the index.ejs file
   });

   app.get('/categories', function(req, res) {
    res.render('categories.ejs'); // load the index.ejs file
});

   app.get('/blog', function(req, res) {
    res.render('blog.ejs'); // load the index.ejs file
});

   app.get('/contact', function(req, res) {
    res.render('contact.ejs'); // load the index.ejs file
});

  app.get('/checkout', function(req, res) {
    res.render('checkout.ejs'); // load the index.ejs file
});
app.get('/product', function(req, res) {
  res.render('product.ejs'); // load the index.ejs file
});




app.get(['/cart','/cart/:id'], function(req,res) {
    const detail = details.filter((detail) => {
    return detail.id == req.params.id
   })[0]
       res.render('cart', {
         id:detail.id,
         path: detail.path,
         title: detail.title,
         body: detail.body,
         price: detail.price,

       })
});

   // =====================================
   // LOGIN ===============================
   // =====================================
   // show the login form
   app.get('/login', function(req, res) {

       // render the page and pass in any flash data if it exists
       res.render('login.ejs', { message: req.flash('loginMessage') });
   });

   // process the login form
   app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

   // app.post('/login', do all our passport stuff here);

   // =====================================
   // SIGNUP ==============================
   // =====================================
   // show the signup form
   app.get('/signup', function(req, res) {

       // render the page and pass in any flash data if it exists
       res.render('signup.ejs', { message: req.flash('signupMessage') });
   });


   // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
   // app.post('/signup', do all our passport stuff here);

   // =====================================
   // PROFILE SECTION =====================
   // =====================================
   // we will want this protected so you have to be logged in to visit
   // we will use route middleware to verify this (the isLoggedIn function)
   app.get('/profile', isLoggedIn, function(req, res) {
       res.render('profile.ejs', {
           user : req.user // get the user out of session and pass to template
       });
   });

        // =====================================
	// FACEBOOK ROUTES =====================
	// =====================================
	// route for facebook authentication and login
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

	// handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));


 // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
            }));




   // =====================================
   // LOGOUT ==============================
   // =====================================
   app.get('/logout', function(req, res) {
       req.logout();
       res.redirect('/');
   });
};



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

   // if user is authenticated in the session, carry on
   if (req.isAuthenticated())
       return next();

   // if they aren't redirect them to the home page
   res.redirect('/');
}
