export async function fetchRequestsSent({searchQ, op}){
    const response = await fetch(`http://499-new-lb-420614602.ca-central-1.elb.amazonaws.com:6969/fetchRequestsSent/api?searchQ=${encodeURIComponent(searchQ)}&op=${encodeURIComponent(op)}`, {
        credentials: "include",
    });

    let resBody = await response.json(); // Retrieve response body and turn into JSON object
    console.log("[RESPONSE BODY SENT REQUESTS RESULTS]:") 
    console.log(resBody);
    return resBody.data;
}

export default fetchRequestsSent; 