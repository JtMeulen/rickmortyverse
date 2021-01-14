# Rick and Morty Favorite Characters
Find your favorites Rick and Morty Characters, save them, and see their details!

### Hosted on Heroku
Find the project on [https://rickmortyfaves.herokuapp.com/](https://rickmortyfaves.herokuapp.com/).
The project is hosted on a free Heroku dyno which goes to sleep after some inactivity. 
So please keep in mind that the first load will always take some time to start up.

### Run locally
- Rename the ```.sample-env``` file to ```.env``` file in the root folder and add the correct values (provided separately) to connect to my remote MongoDB cluster
- In the root folder run ```$ npm run setup``` in order to install all dependencies for the client and server
- In the root folder ```$ npm run dev``` to concurrently start the server and client (http://localhost:3000/)

### Stack used for the project:
I have used my own boilerplate MERN stack to start up the project. [https://github.com/JtMeulen/MERN_skeleton](https://github.com/JtMeulen/MERN_skeleton)
- React
- Redux
- Express
- Mongoose
- MongoDB
- Passport

### Folder structure
```
  .
  ├── client                    # React.js frontend application
  │   ├── src                 
  │   │   ├── components        # All React components are here   
  │   │   ├── assets            # Images, files, etc  
  │   │   ├── store             # Redux store related files
  │   │   ├── index.js          # React.js frontend application
  │   │   └── root-styles.css   # Global CSS styling
  │   ├── public                # Folder containing index.html file
  │   └── package.json        
  ├── server
  │   ├── api                   # All api routes
  │   ├── models                # Database schema
  │   ├── database.js           # Database setup and connection
  │   ├── middleware.js         # Containing middleware functions
  │   └── index.js              # Node.js backend server                    
  ├── package.json                 
  ├── .sample-env               # Env variables to be copied in a .env file (var values provided separately)   
  └── README.md
```
