import mongoose from 'mongoose';

// defining the schema for the database : 
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {timestamps: true}); 

export default mongoose.model('Task',taskSchema);