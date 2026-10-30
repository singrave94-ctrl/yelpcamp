const { campgroundSchema, reviewSchema } = require('./schemas.js')
const ExpressError = require('./utils/ExpressError')
const Campground = require('./models/campgrounds')  
// middleware.js
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
};

// Ensure named export on module.exports:
module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
};

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    console.log(error)
    if(error) {
            console.log(error)
            const msg = error.details.map(el => el.message).join(',')
            throw new ExpressError(msg  , 400)
        } else {
            next();
        }
}

module.exports.isAuthor = async(req, res, next) => {
    const { id } = req.params;
      const campground = await Campground.findById(id)
    if (!campground) {
        req.flash('error', 'Cannot find that campground')
        return res.redirect('/campgrounds')
    }
    next();
}


module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    console.log(error)
    if(error) {
            console.log(error)
            const msg = error.details.map(el => el.message).join(',')
            throw new ExpressError(msg  , 400)
        } else {
            next();
        }
}
