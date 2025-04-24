import mongoose from 'mongoose';
const imageModel = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    details: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    image: {
        type: String,
        required: true,
    }
})
export default mongoose.model("Product", imageModel)