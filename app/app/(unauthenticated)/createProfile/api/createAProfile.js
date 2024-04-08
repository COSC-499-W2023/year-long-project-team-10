export async function createAProfile(data){
const dotenv = require("dotenv");
dotenv.config();

    const response = await fetch(`http://499-new-lb-420614602.ca-central-1.elb.amazonaws.com:6969/createAProfile/api`, {
        method: 'POST',
        body: data,
        credentials: "include",
    });

    let resBody = await response.json(); // Retrieve response body and turn into JSON object
    console.log("[RESPONSE BODY CREATE PROFILE]:") 
    console.log(resBody);
    return resBody;
   }

   export default createAProfile;