const express = require("express");
const router = express.Router();
const db = require("../db-connection.js");

router.post("/api", async (req, res) => {
  console.log(req.body);

  const {searchQ, occupationTags, op} = req.body; //If op is 0, then we are searching by name. If op is 1, then we are searching by email. If op is 2, then we are searching by username.

  var whereFilter = '';
  switch(op){ 
    case 0: // Search by name
      whereFilter = ` profile."name"`;
      break;
    case 1: // Search by email
      whereFilter = ` member."email"`;
      break;
    case 2: // Search by username
      whereFilter = ` member."username"`;
      break;
  }
  try {
    
    if(occupationTags.length > 0){

        let query = `SELECT member."username", member."email", profile."name", profile."country", array_agg(tag."tagName") as "tags" 
        FROM profile JOIN (
          select "memberID"
          from user_tag join tag on user_tag."tagID" = tag."tagID"
          where tag."tagName" = any($1) 
        ) as matchingProfiles ON profile."memberID" = matchingProfiles."memberID"
        JOIN user_tag ON profile."memberID" = user_tag."memberID"
        JOIN tag on user_tag."tagID" = tag."tagID" 
        JOIN member ON profile."memberID" = member."memberID"
        WHERE ${whereFilter} ILIKE $2
        GROUP BY profile."memberID", member."username", member."email", profile."name", profile."country";`;

      
        const profiles = await db.any(query, [occupationTags, searchQ+'%']);
        console.log("[SUCCESS]: PROFILE FETCHED SUCCESSFUL");
        res.json({
            data: profiles,
            status: 202,
            message: "Search Query Fetch Successful",
            pgErrorObject: null,
          });

        }
    else if(occupationTags.length == 0){ // If no tags are selected, then just search by name. even if name is empty, it will still work because empty string is a substring of all strings
        let query = `SELECT member."username", member."email", profile."name" ,profile."country", array_agg(tag."tagName") as "tags" 
        FROM profile 
        JOIN user_tag ON profile."memberID" = user_tag."memberID"
        JOIN tag on user_tag."tagID" = tag."tagID"
        JOIN member ON profile."memberID" = member."memberID"
        WHERE ${whereFilter} ILIKE $1
        GROUP BY profile."memberID", member."username", member."email", profile."name", profile."country";`;

        const profiles = await db.any(query, [searchQ + '%']);
        console.log("[SUCCESS]: SEARCH QUERY FETCH SUCCESSFUL");
        console.log(profiles);
        res.json({
            data: profiles,
            status: 202,
            message: "Search Query Fetch Successful",
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
          message: "Search Query Fetch Failed",
          pgErrorObject: {
            ...error,
          },
        })
    );
    res.json({
      data: null,
      status: 500,
      message: "Search Query Fetch Failed",
      pgErrorObject: {
        ...error,
      },
    });
  }
});

module.exports = router;