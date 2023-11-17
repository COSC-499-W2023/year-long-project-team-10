const express = require("express");
const router = express.Router();
const db = require("../db-connection.js")

router.post('/api', async (req, res) => {
    
    try
    {
        // Must confirm that the logged in user is a member of the chat
        // Since we are not using sessions, we will hardcode the memberID for now
        
        const memberID = '777878f5-1ee2-4731-92f9-ecfe983e95bb';
        const chatID = req.body.chatID;

        const isMember = await db.any(`
        SELECT * FROM chat WHERE "chatID" = $1 AND ("memberID1" = $2 OR "memberID2" = $2)
        `, [chatID, memberID]);

        if(isMember.length == 0)
        {
            res.json({ status: 401, message: 'Unauthorized access' });
        }

        else
        {
            await db.none(`
            DELETE FROM chat WHERE "chatID" = $1
            `, [chatID]);
            res.json({ status: 201, message: 'Deleted chat successfully' });
        }
        
    } 
    catch(error)
    {
        res.json({ status: 500, message: 'Failed to delete chat'});
    }
});

module.exports = router;