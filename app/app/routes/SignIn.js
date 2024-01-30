const express = require("express");
const router = express.Router();

const db = require("../db-connection.js");
const cryptojs = require("crypto-js");
const HmacSHA256 = cryptojs.HmacSHA256;

router.post("/api", async (req, res) => {
  console.log(req.body);

  const { identifier, password, isEmail } = req.body;
  try {
    console.log("[SIGN-IN]: IN TRY");
    if (identifier == "" || password == "") {
      console.log("[SIGN-IN]: EMPTY FIELDS");
      return res.json({
        status: 422,
        message: "Please fill all required fields",
      });
    }
    let member = await db.one(
      isEmail
        ? 'SELECT "memberID" FROM member WHERE "email" = $1 AND "password" = $2'
        : 'SELECT "memberID" FROM member WHERE "username" = $1 AND "password" = $2',
      [
        identifier,
        HmacSHA256(
          password,
          "230e6fc32123b6164d3aaf26271bb1843c67193132c78137135d0d8f2160d1d3"
        ).toString(),
      ]
    );

   // We need to check if the user has actually created a profile yet. If not, we need to redirect them to the profile creation page.
    const hasProfile = await db.any(`
    SELECT * FROM profile WHERE "memberID" = $1
    `, [member.memberID]);

    // If the user has not created a profile yet, we will redirect them to the profile creation page. We'll also store their memberID in the session data, so that we can use it to create their profile.
    // Also, we'll use a special status code, 205, to indicate that the user has not created a profile yet.
    if(hasProfile.length === 0)
    {
      req.session.signUpMemberID = member.memberID; // Store memberID in session data as signUpMemberID since CreateProfile.js is expecting that.
      req.session.save(); // Save session data
      console.log("[MEMBER ID]: " + req.session.signUpMemberID + " [STATUS CODE]: 205");

      console.log("SUCCESS 205");
      res.json({
        data: { id: member.memberID },
        status: 205,
        message: "User SignIn Successful",
        pgErrorObject: null,
      });
    }

    else // If the user has created a profile, we will store their memberID in the session data, and redirect them to the search page.
    {
      req.session.loggedInUserMemberID = member.memberID; // Store memberID in session data
      req.session.save(); // Save session data
      console.log("[MEMBER ID]: " + req.session.loggedInUserMemberID + " Is Logged In");
      console.log("SUCCESS 201");	
      res.json({
        data: { id: member.memberID },
        status: 201,
        message: "User SignIn Successful",
        pgErrorObject: null,
      });
    }

  } catch (error) {
    console.log(typeof error.received);
    if (error.name === "QueryResultError") {
      console.log("[SIGN-IN]: INVALID CREDENTIALS");
      console.log({
        data: null,
        status: 404,
        message: "Invalid Credentials",
        pgErrorObject: {
          ...error,
        },
      });
      return res.json({
        data: null,
        status: 404,
        message: "Invalid Credentials",
        pgErrorObject: {
          ...error,
        },
      });
    }
    console.log("[SIGN-IN]: SERVER ERROR");
    res.json({
      data: null,
      status: 500,
      message: "User SignIn Failed",
      pgErrorObject: {
        ...error,
      },
    });
  }
});

module.exports = router;
