// middleware function to validate incoming task data before it reaches our controller or service : 
export const validateTask = (req, res, next)=>{
    const { title } = req.body;
    if(!title || title.trim() === ''){
        res.status(400).json({
            message: 'Title is required!'
        });
        return;
    }
    if(title.trim().length > 100){
        res.status(400).json({
            message: 'Title too long!'
        });
        return;
    }
    req.body.title = title.trim();
    next();
}