const express = require("express");
const router = express.Router();
const db = require("../db-connection.js");
const multer = require("multer");
// const S3Client = require("@aws-sdk/client-s3");
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
const dotenv = require("dotenv");
dotenv.config();

// get the environment variables from the .env file
const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3Object = new S3Client({ //creates a s3 object given the environment variables
    credentials:{
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion
});

const storage = multer.memoryStorage();
const upload = multer({storage: storage});


router.post('/api', upload.single('file'), async(req,res) => {

    const memberID = req.session.signUpMemberID;

    console.log('req.body', req.body)
    console.log('req.file', req.file)

    const params = {
        Bucket: bucketName, //upload will happen to this s3 bucket
        Key: req.file.originalname, //name of the file that is on the user's computer
        Body: req.file.buffer,  //buffer contains the actual binary data of the file
        ContentType: req.file.mimetype, //the type of the file in question
    }
    const command = new PutObjectCommand(params)

    await s3Object.send(command);

    await db.none('INSERT INTO files("memberID", "fileName") VALUES ($1, $2)', [memberID, req.file.originalname]); 
    //inserts image name and associates it with the current user. 
    //currently this serves no purpose but will be needed when retrieving images from s3 with signed URLs
    
    res.json({status:200, message:"image saved successfuly??"});
})

module.exports = router