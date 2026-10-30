const express = require('express');
const router = express.Router({ mergeParams: true });
const { campgroundSchema } = require('../schemas.js');
const { validateReview, isLoggedIn } = require("../middleware")

// const path = require('path');
const catchAsync = require('../utils/catchAsync')
const Review = require('../models/review');
const reviews = require('../controllers/reviews')
const Campground = require('../models/campgrounds')
const ExpressError = require('../utils/ExpressError')

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))


router.delete('/:reviewId', catchAsync(reviews.eraseReview))


module.exports = router;
