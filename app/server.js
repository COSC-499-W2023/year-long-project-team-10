const express = require("express");
const server = express();
const PORT = 6969;
//const cors = require('cors');

//Middleware to parse JSON requests
server.use(express.json());
//server.use(cors());

//Any Routes
const createProfileRoutes = require('./app/routes/Profile');  // profileRoute will equal to the "router" object exported from routes/Profile.js
server.use('/createAProfile', createProfileRoutes ); // Any time /createAProfile is put within URL, you tell express to utilize the routes present in createProfileRoutes = './routes/Profile'

const searchRoutes = require('./app/routes/Search');
server.use('/search', searchRoutes);


server.listen(PORT, ()=>{
    console.log('Server started on http://localhost:6969');
})


