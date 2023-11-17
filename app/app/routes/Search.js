const express = require("express");
const router = express.Router();
const db = require("../db-connection.js")

router.get('/api', async (req, res) => {
    //get query parameters from request
    const {q} = req.query;
    //temporary
    console.log("made it to Search.js route");
    
    try {
        const query = await db.any('SELECT name FROM profile WHERE LOWER("name") LIKE $1', [`%${q.toLowerCase()}%`]);
        if(query.length == 0){
            res.json({status: 422, message: 'Unable to find profiles related to search'});
            return;
        } else {
            res.json({status: 201, message: 'Retrieved search results successfully', data: query});
        }
    } catch (error) {
        console.error('error during db query', error);
        res.status(500).json({error: 'server error'});
    }
    

   
});

module.exports = router;