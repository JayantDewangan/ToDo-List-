import Task from '../models/Task.js';

// service layer for fetching tasks with optional search functionality : 
export const fetchAllTasks = async (search)=>{
    if(search){
        return await Task.find({ title: { $regex: search, $options: 'i' } });
    }
    return await Task.find();
};

// service layer for fetching tasks by id : 
export const fetchTaskById = async (id)=>{
    return await Task.findById(id);
};

// service layer for creating tasks : 
export const createTaskService = async (title)=>{
    const task = new Task({ title });
    return await task.save();
};

// service layer to update task title : 
export const updateTaskTitle = async (id, title)=>{
    return await Task.findByIdAndUpdate(id, { title }, { new: true });
};

// service layer to toggle task status : 
export const toggleTaskStatus = async (id, completed)=>{
    return await Task.findByIdAndUpdate(id, { completed }, { new: true });
};

// service layer to remove task : 
export const removeTask = async (id)=>{
    return await Task.findByIdAndDelete(id);
};