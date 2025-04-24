import express from "express";
import multer from "multer";
import cloudinary from "../cloudinary/cloudConfig.js";
import {uploadImage,gettingImages} from "../Controller/productController.js";
import authentication from "../Middleware/authentication.js"
 

const router= express.Router()
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Products",
        allowed_formats: ["jpg", "png", "jpeg"]
    }
})

const upload = multer({ storage });

router.post("/upload",authentication,upload.single("image"), uploadImage);
router.get("/gettingproduct",gettingImages)
