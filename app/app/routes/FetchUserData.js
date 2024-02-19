const express = require("express");
const router = express.Router();
const db = require("../db-connection.js");

router.post("/api", async (req, res) => {

  console.log("body: " + req.body);
  
  const { slug } = req.body;
  try {
    console.log("[FETCH USER]: IN TRY");
    if (slug == "") {
      console.log("[ERROR]: EMPTY FIELDS");
      return res.json({
        data: null,
        status: 400,
        message: "Missing Parameters.",
        pgErrorObject: null,
      });
    }

    // DEBUG LINE
    console.log("[FETCHUSERDATA | username]: ", slug);

    // Retrieve the user data, along with memberID. It is only used to check if the user is the logged in user. It will be deleted after the check.
  
  
    const user = await db.one(
      `SELECT member."memberID", member."username", member."email", profile."name", profile."country", profile."address", profile."bio", array_agg(tag."tagName") as "tags"
      FROM profile
      JOIN member ON profile."memberID" = member."memberID"
      JOIN user_tag ON profile."memberID" = user_tag."memberID"
      JOIN tag ON user_tag."tagID" = tag."tagID"
      WHERE member."username" = $1
      GROUP BY member."memberID", member."username", member."email", profile."name", profile."country", profile."address", profile."bio"`,
      [slug]
    );


    // DEBUG LINE
    console.log("[FETCH USER DATA | USER FETCHED]: ", user);

    const loggedInUserID = req.session.loggedInUserMemberID;
    const queriedUserID = user.memberID;

    console.log("CHECKID: " + queriedUserID + " Logged In User ID: " + loggedInUserID);

    

    if (queriedUserID == loggedInUserID) {

      delete user.memberID; // Delete the memberID from the user object


      //DEBUGGING
      console.log("[SUCCESS]: USER FETCHED SUCCESSFUL");
      console.log("[USER]: ", user);
      console.log("[MATCH] -> UserID: " + queriedUserID + " Session UserID: " + loggedInUserID);
      // END DEBUGGING

      // If the user queried is the logged in user, then we don't need to check if the user has a chat or request.
      user.hasChat = null;
      user.hasRequest = null;
      console.log("[USER HAS REQUEST]: ", user.hasRequest);
      console.log("[USER HAS CHAT]: ", user.hasChat);



      res.json({
        data: { ...user },
        status: 202,
        message: "User Fetch Successful",
        pgErrorObject: null,
      });
    } 
    else
    {
      delete user.memberID; // Delete the memberID from the user object
      
      
      // DEBUGGING
      console.log("[SUCCESS]: USER FETCHED SUCCESSFUL");
      console.log("[USER]: ", user);
      console.log("[DOESN'T MATCH] -> UserID: " + queriedUserID + " Session UserID: " + loggedInUserID);
      // END DEBUGGING


      // Check if the user has sent or received a request
      let requestData = await db.oneOrNone(`
      SELECT * FROM request WHERE ("fromMemberID" = $1 AND "toMemberID" = $2) OR ("fromMemberID" = $2 AND "toMemberID" = $1)
      `, [loggedInUserID, queriedUserID]);

      let hasRequest = 0; // 0 = No request, 1 = Sent request, 2 = Received request

      if(requestData != null)
      {
        console.log("[REQUEST DATA]: ", requestData);
        if(requestData.fromMemberID == loggedInUserID)
        {
          hasRequest = 1;
        }

        else if(requestData.toMemberID == loggedInUserID)
        {
          hasRequest = 2;
        }

      }

      // Check if the user has a chat
      let chatData = await db.oneOrNone(`
      SELECT * FROM chat WHERE ("memberID1" = $1 AND "memberID2" = $2) OR ("memberID1" = $2 AND "memberID2" = $1)
      `, [loggedInUserID, queriedUserID]);
      console.log("[CHAT DATA]: ", chatData);

      let hasChat = 0; // 0 = No chat, 1 = Chat exists

      if(chatData != null)
      {
        hasChat = 1;
      }

      // Add the hasRequest and hasChat properties to the user object
      user.hasRequest = hasRequest;
      user.hasChat = hasChat;

      console.log("[USER HAS REQUEST]: ", user.hasRequest);
      console.log("[USER HAS CHAT]: ", user.hasChat);

      res.json({
        data: { ...user },
        status: 200,
        message: "User Fetch Successful",
        pgErrorObject: null,
      });
    } 


  } catch (error) {
    console.log("[ERROR NAME]:\n" + error.name);
    console.log(
      "[LOG RESPONSE]:\n" +
        JSON.stringify({
          data: null,
          status: 500,
          message: "User Fetch Failed",
          pgErrorObject: {
            ...error,
          },
        })
    );
    res.json({
      data: null,
      status: 500,
      message: "User Fetch Failed",
      pgErrorObject: {
        ...error,
      },
    });
  }
});

module.exports = router;
