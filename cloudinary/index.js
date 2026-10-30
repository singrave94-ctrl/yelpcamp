const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY, // Or process.env.CLOUDINARY_CLOUD_KEY
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'YelpCamp',
        allowed_formats: ['jpeg', 'png', 'jpg'] // Must be snake_case 'allowed_formats'
    }
});

module.exports = {
    cloudinary,
    storage
};