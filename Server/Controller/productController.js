import cloudinaryUpload from "../cloudinary/cloudConfig.js";
import imageModel from "../Model/productModel.js";
import productSchema from "../Schema/productSchema.js";
import chalk from "chalk";

export const uploadImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "no image uploaded" });
    }
    try {
        console.log("receive body", req.body);
        const validateProduct = await productSchema.validateAsync(req.body);
        
        // Use the Cloudinary upload if needed here
        // const result = await cloudinaryUpload(req.file.path);

        const newProduct = await new imageModel({ ...validateProduct, image: req.file.path });
        await newProduct.save();

        console.log('product route hit', req.file.path);
        res.status(200).json({
            success: true,
            message: "image successfully uploaded",
            image: req.file.path
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};


export const gettingImages = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            error: "req.body no found"
        })

    }
    try {
        const productCollection = await imageModel.find()
        res.status(200).json({
            success: true,
            message: "all products found",
            productCollection: productCollection
        })
    } catch (error) {
        console.log(chalk.bgRed.white("error: ", error.message));
        res.status(404).json({
            success: false,
            message: "no product found",
        })

    }
}