import taskSchema from "../Schema/taskSchema.js";
import  databaseTaskSchema from "../Model/taskModel.js";
import chalk from "chalk";


//create task 
export const createTask = async (req, res) => {
    try {
        console.log("received body", req.body);


        const validatedTask = await taskSchema.validateAsync(req.body)
        console.log("validated tasks",validatedTask);
        
        const newTask = await new databaseTaskSchema({ ...validatedTask });
        console.log(newTask);
        
        await newTask.save()


        res.status(201).json({
            message: "task has created",
            task: newTask
        })
    }
    catch (error) {
        if (error?.code === 11000) {
            return res.status(409).json({
                message: "this task is in use",
                error: error.message
            })
        }
        res.status(500).json({
            message: "internal server error ",
            error: error.message
        })
    }
}

//deleteTask
export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id
        const task = await  databaseTaskSchema.findByIdAndDelete(taskId)
        if (!task) {
            return res.status(404).json({
                message: "task not found"
            })
        }
        res.status(200).json({
            message: "task deleted successfully",
            task: task
        })
    } catch (error) {
        console.log(chalk.bgRed.white("error in deleting task", error.message));
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })
    }
}

export const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id
        const task = await  databaseTaskSchema.findByIdAndUpdate(taskId, req.body, { new: true })
        if (!task) {
            return res.status(404).json({
                message: "task not found"
            })
        }
        res.status(200).json({
            message: "task updated successfully",
            task: task
        })
    } catch (error) {
        console.log(chalk.bgRed.white("error in updating task", error.message));
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })

    }
}

// getAlltasks
export const getAllTasks = async (req, res) => {
    try {
        console.log(chalk.bgGray);
        const tasks = await  databaseTaskSchema.find()
        if (!tasks) {
            return res.status(404).json({
                message: "no tasks found"
            })
        }
        res.status(200).json({
            message: "all tasks",
            tasks: tasks
        })
    } catch (error) {
        console.log(chalk.bgRed.white("error in getting all tasks", error.message));
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })
    }
}
