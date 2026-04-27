# Todo List App

This is a todo list app. The backend is made using Node.js and Express and the data is stored in MongoDB. The frontend is built in React.

For the backend I followed a controller and routes structure where the routes just map the urls and the actual logic sits in the controller file. I used mongoose to interact with MongoDB.

The app supports these operations:
- get all tasks
- search tasks by title
- add a new task
- update a task title
- mark a task as completed or not
- delete a task

For the frontend I used axios to call these APIs and useState and useEffect to manage and load the data.

The backend is deployed on Render and the frontend is deployed on Netlify.

- Backend: https://your-render-url.onrender.com
- Frontend: https://your-netlify-url.netlify.app


## How to Run Locally

### Backend  
- Go to the server folder and install dependencies :  

```
cd server
npm install
```  

- Create a '.env' file in the server folder with these values:

```
MONGO_URI=your_mongodb_atlas_connection_string
PORT=8000
```

- To get the MONGO_URI :  
    - Go to MongoDB Atlas.
    - Click Connect on your cluster.
    - Choose "Connect your application".
    - Copy the connection string. 
    - Replace `<password>` with your actual database user password. 


```
npm run dev
```

- Server will start at http://localhost:8000


### Frontend 

- Go into the client folder:
```
cd client
npm install
```

- Create a `.env.local` file in the client folder :
```
VITE_API_URL=http://localhost:8000
```

- Then run : 
```
npm run dev
```

- Frontend will open at http://localhost:5173