import { v2 as cloudinary } from 'cloudinary';
import "dotenv/config";
import streamifier from 'streamifier';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret_key: process.env.API_SECRET
})


const uploadImage = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
            folder: "products"
        }, (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        });
        streamifier.createReadStream(buffer).pipe(stream)

    })
}
export default uploadImage

