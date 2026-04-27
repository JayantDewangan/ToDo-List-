import {
    fetchAllTasks,
    fetchTaskById,
    createTaskService,
    updateTaskTitle,
    toggleTaskStatus,
    removeTask
} from '../services/taskService.js';

// controller to get all the tasks : 
export const getAllTasks = async (req, res)=>{
    try{
        const tasks = await fetchAllTasks(req.query.search);
        res.json(tasks);
    } catch(err){
        res.status(500).json({ message: err.message });
    }
};

// controller to get a task by id : 
export const getTask = async (req, res)=>{
    try{
        const task = await fetchTaskById(req.params.id);
        if(!task){
            res.status(404).json({
                message: 'Task not found'
            });
            return;
        }
        res.json(task);
    } catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}

// controller to create a task : 
export const createTask = async (req, res)=>{
    try{
        const saved = await createTaskService(req.body.title);
        res.status(201).json(saved);
    } catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}

// controller to update task : 
export const updateTask = async (req, res)=>{
    try{
        const task = await updateTaskTitle(req.params.id, req.body.title);
        if(!task){
            res.status(404).json({
                message: 'Task not found'
            });
            return;
        }
        res.json(task);
    } catch(err){
        res.status(500).json({
            message: err.message
        });
    }
};

// controller to toggle task status : 
export const toggleTask = async (req, res)=>{
    try{
        const task = await toggleTaskStatus(req.params.id, req.body.completed);
        if(!task){
            res.status(404).json({
                message: 'Task not found'
            });
            return;
        }
        res.json(task);
    } catch(err){
        res.status(500).json({
            message: err.message
        });
    }
};

// controller to delete a task : 
export const deleteTask = async(req, res)=>{
    try{
        const task = await removeTask(req.params.id);
        if(!task){
            res.status(404).json({
                message: 'Task not found'
            });
            return;
        }
        res.json({
            message: 'Task deleted'
        });
    } catch(err){
        res.status(500).json({
            message: err.message
        });
    }
};