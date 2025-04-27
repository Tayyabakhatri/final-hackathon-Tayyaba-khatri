import express from 'express';
const router = express.Router();
import { createTask, getAllTasks,updateTask, deleteTask } from '../Controller/taskController.js';
router.post('/task', createTask)
router.get('/taskss', getAllTasks)
router.put('/task/:id', updateTask)
router.delete('/task/:id', deleteTask)

export default router;