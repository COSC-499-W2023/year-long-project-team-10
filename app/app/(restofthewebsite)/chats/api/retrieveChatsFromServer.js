export async function retrieveChats(searchQuery){
const dotenv = require("dotenv");
dotenv.config();

    console.log("REQUEST FOR RETRIEVE CHATS WITH SEARCHQ: " + searchQuery);
    const response = await fetch(`http://499-new-lb-420614602.ca-central-1.elb.amazonaws.com:6969/retrieveChats/api?searchQ=${encodeURIComponent(searchQuery)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        cache: "no-cache",
        credentials: "include"
    });

    /** Sort resBody.data by the messageID */
    

    let resBody = await response.json(); // Retrieve body and turn into JSON object
    return resBody;
}
export default retrieveChats;