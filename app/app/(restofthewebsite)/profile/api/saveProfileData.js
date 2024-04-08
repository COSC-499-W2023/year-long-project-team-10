export async function updateProfileInfo(data){
const dotenv = require("dotenv");
dotenv.config();

    const response = await fetch(`http://499-new-lb-420614602.ca-central-1.elb.amazonaws.com:6969/saveProfileData/api`, {
        method: 'POST',
        body: data,
        credentials: "include",
    });

    let resBody = await response.json(); 
    console.log("[RESPONSE BODY UPDATE PROFILE]:") 
    console.log(resBody);
    return resBody;
   }

   export default updateProfileInfo;


