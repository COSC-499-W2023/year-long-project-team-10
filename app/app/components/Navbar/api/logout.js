export async function logout(){
const dotenv = require("dotenv");
dotenv.config();

    const response = await fetch(`http://499-new-lb-420614602.ca-central-1.elb.amazonaws.com:6969/logout/api`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        cache: "no-cache",
        credentials: "include",
    });

    let resBody = await response.json(); 
    console.log("[RESPONSE BODY LOGOUT]:") 
    console.log(resBody);
    return resBody;
   }

   export default logout;