import { v2 as cloudinary } from 'cloudinary';

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.VITE_CLOUDINARY_API_KEY, // Replace with your actual API secret
});

module.exports = cloudinary;