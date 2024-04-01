export async function fetchBlockedUsers({searchQ, op}){
    const response = await fetch(`http://499-new-lb-420614602.ca-central-1.elb.amazonaws.com:6969/fetchBlockedUsers/api?searchQ=${encodeURIComponent(searchQ)}&op=${encodeURIComponent(op)}`, {
        credentials: "include",
    });

    let resBody = await response.json(); // Retrieve response body and turn into JSON object
    console.log("[RESPONSE BODY BLOCKED USERS RESULTS]:") 
    console.log(resBody);
   
    if(resBody.status === 200){
       return resBody.data;
   }
    else{
         return null;
    }
}

export default fetchBlockedUsers 
  