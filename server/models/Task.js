import mongoose from 'mongoose';

// defining the schema for our database : 
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {timestamps: true}); // timestamps automatically adds createdAt and updatedAt time

export default mongoose.model('Task',taskSchema); 
// This creates a Mongoose model named "Task" based on the schema we have defined that is the taskSchema