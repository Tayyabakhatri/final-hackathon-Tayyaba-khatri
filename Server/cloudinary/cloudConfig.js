import { v2 as cloudinary } from 'cloudinary';
import "dotenv/config";
// import streamifier from 'streamifier';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret_key: process.env.API_SECRET
})



export default cloudinary

