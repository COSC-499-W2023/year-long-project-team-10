const express = require("express");
const router = express.Router();
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const {getSignedUrl} = require("@aws-sdk/s3-request-presigner")

const dotenv = require("dotenv");
dotenv.config();


router.post("/api", async (req, res) => {

    try{
            console.log("request says:" , req.body)
            console.log("in the server");
            res.json({status: 200, body: "this message is from the server post request"});

    }catch(error) {
        console.error("Server very very bad:", error);
        res.status(500).json({status: 500, message: "Server very very bad :("});
    }
})

router.get("/", async (req, res) => {
    try {
        console.log("Health check request received");
        res.status(200).send("Server is healthy"); // Respond with 200 OK and a message
    } catch (error) {
        console.error("Error in health check:", error);
        res.status(500).send("Server is not healthy"); // Respond with 500 Internal Server Error
    }
});




module.exports = router