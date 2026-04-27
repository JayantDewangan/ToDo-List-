import express from 'express';
import {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    toggleTask,
    deleteTask
} from '../controllers/taskController.js';
import { validateTask } from '../middleware/validation.js';

const router = express.Router();

router.get('/',getAllTasks);
router.get('/:id',getTask);
router.post('/', validateTask, createTask);
router.put('/:id',validateTask, updateTask);
router.patch('/:id', toggleTask);
router.delete('/:id', deleteTask);

export default router;