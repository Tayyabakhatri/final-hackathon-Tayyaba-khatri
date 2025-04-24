import Joi from 'joi';

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),  // Fixed the error here
    image: Joi.any(),  // Joi.any() works, but you may need custom validation for images
});

export default productSchema;