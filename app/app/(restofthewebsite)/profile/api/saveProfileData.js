export async function updateProfileInfo(data){
    const response = await fetch('http://499-new-lb-420614602.ca-central-1.elb.amazonaws.com:6969/saveProfileData/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data),
        cache: "no-cache",
        credentials: "include",
    });

    let resBody = await response.json(); 
    console.log("[RESPONSE BODY UPDATE PROFILE]:") 
    console.log(resBody);
    return resBody;
   }

   export default updateProfileInfo;


