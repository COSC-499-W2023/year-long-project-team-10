export async function fetchRequestsSent({searchQ, searchBy}){
const dotenv = require("dotenv");
dotenv.config();

    const response = await fetch(`http://499-new-lb-420614602.ca-central-1.elb.amazonaws.com:6969/fetchRequestsSent/api?searchQ=${encodeURIComponent(searchQ)}&searchBy=${encodeURIComponent(searchBy)}`, {
        credentials: "include",
    });

    let resBody = await response.json(); // Retrieve response body and turn into JSON object
    console.log("[RESPONSE BODY SENT REQUESTS RESULTS]:") 
    console.log(resBody);
    return resBody;
}

export default fetchRequestsSent; 