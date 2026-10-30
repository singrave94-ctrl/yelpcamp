const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const catchAsync = require('../utils/catchAsync')
const multer  = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage })
const { campgroundSchema } = require('../schemas.js');

const { isLoggedIn, isAuthor, validateCampground} = require('../middleware')



const Campground = require('../models/campgrounds')
// const Review = require('../models/review');


router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampgrounds));


router.get('/new', isLoggedIn, campgrounds.renderNewForm)

// router.get('/new', isLoggedIn, (req, res) => {
    
//     res.render('campgrounds/new')
// })

router.route('/:id')
.get( catchAsync(campgrounds.showCampground))
.put(isLoggedIn, isAuthor,upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampgrounds ))
.delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampagrounds))


router.get('/:id/edit',isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))




module.exports = router;
