const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

// Image Schema for Cloudinary images
const ImageSchema = new Schema({
    url: String,
    filename: String
});

// Virtual for Cloudinary 200px thumbnail transformation
ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200');
});

// Enable virtuals when converting Mongoose documents to JSON
const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

// Map Cluster Pop-Up Virtual (Cleaned single-line HTML string)
CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong><p>${this.description ? this.description.substring(0, 20) : ''}...</p>`;
});

// Cascade Delete Middleware for Reviews
CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        });
    }
});

module.exports = mongoose.model('Campgrounds', CampgroundSchema);