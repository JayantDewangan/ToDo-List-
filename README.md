# Todo List App

This is a todo list app. The backend is made using Node.js and Express and the data is stored in MongoDB. The frontend is built in React.

For the backend I followed a controller and routes structure where the routes just map the urls and the actual logic sits in the controller file. I used mongoose to interact with MongoDB.

The app supports these operations:
- get all tasks
- add a new task
- update a task title
- mark a task as completed or not
- delete a task

For the frontend I used axios to call these APIs and useState and useEffect to manage and load the data.

The backend and frontend both are deployed on Render.

- Backend: https://todo-list-vmv0.onrender.com
- Frontend: https://todo-list-1-ky8r.onrender.com

