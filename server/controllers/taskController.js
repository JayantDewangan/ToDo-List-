import Task from '../models/Task.js';

// get all the tasks : 
export const getAllTasks = async (req, res)=>{ // asynchronous function because the operation Task.find() return promises
    const tasks = await Task.find(); // Task.find() quesries the MongoDB collection "tasks" ans it retrieves all the document in that collection. await ensures that the function awaits until the query finishes before moving on 
    res.json(tasks); // sends the retrieved data back to the client in JSON format 
};

// create a task  :
export const createTask = async (req, res)=>{
    // checking whether the title is provided by the user or not 
    if(!req.body.title){
        res.status(400).json({
            message: 'Title is required!'
        });
        return;
    }
    // creating a new Task instance: 
    const task = new Task({
        title: req.body.title
    });
    // saving the task to MongoDB :
    const saved = await task.save();
    // sending the saved task back with 201 created status : 
    res.status(201).json(saved);
};

// update title : 
export const updateTask = async (req, res)=>{
    const task = await Task.findByIdAndUpdate(
        req.params.id,
        { title: req.body.title }, // updates the old title with new one
        { new: true } // returns new document instead of old one
    );
    if(!task){ // if the task is not present
        res.status(404).json({
            message: 'Task not found!'
        });
        return;
    }
    res.json(task); // send back the updated task
};

// toggle completed :
export const toggleTask = async (req, res)=>{
    const task = await Task.findByIdAndUpdate(
        req.params.id,
        { completed: req.body.completed },
        { new: true }
    );
    if(!task){ // if the task is not present
        res.status(404).json({
            message: 'Task not found!'
        });
        return;
    }
    res.json(task);
};

// delete a task : 
export const deleteTask = async (req, res)=>{
    const task = await Task.findByIdAndDelete(req.params.id);
    if(!task){
        res.status(404).json({
            message: 'Task not found'
        });
        return;
    }
    res.json({
        message: 'Task deleted'
    })
};