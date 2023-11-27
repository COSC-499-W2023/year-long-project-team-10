const express = require("express");
const server = express();
const PORT = 6969;
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};

//Middleware to parse JSON requests
server.use(cors(corsOptions));
server.use(express.json());

//Any Routes
const createProfileRoutes = require("./app/routes/Profile"); // profileRoute will equal to the "router" object exported from routes/Profile.js
server.use("/createAProfile", createProfileRoutes); // Any time /createAProfile is put within URL, you tell express to utilize the routes present in createProfileRoutes = './routes/Profile'

//Any Routes
const signupRoutes = require("./app/routes/SignUp");
server.use("/signup", signupRoutes);

const deleteuserRoutes = require("./app/routes/DeleteUser");
server.use("/deleteuser", deleteuserRoutes);

const signinRoutes = require("./app/routes/SignIn");
server.use("/signin", signinRoutes);

server.listen(PORT, () => {
  console.log("Server started on http://localhost:6969");
});
