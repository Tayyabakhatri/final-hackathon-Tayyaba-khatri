import Joi from "joi";

const taskSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(100).required(),
    assignedTo: Joi.string().min(3).max(30).required(), // <-- ADD THIS
    status: Joi.string().valid("pending", "in-progress", "completed").required(),
    duedate: Joi.date().greater("now").required(),
});
export default taskSchema;