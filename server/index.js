import express from 'express';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import taskRoutes from './routes/tasks.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.json({
        message: 'Todo API is running!'
    });
})

app.use('/tasks',taskRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('MongoDB connected!');
        app.listen(PORT,()=>{
            console.log(`Server is up and running on port ${PORT} at http://localhost:${PORT}`);
        });
    })
    .catch((err)=>{
        console.log('Database connection failed: ',err);
    });