export async function acceptRequest(data){
    const response = await fetch('http://localhost:6969/acceptRequest/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: "include",
    });

    let resBody = await response.json(); // Retrieve response body and turn into JSON object
    console.log(resBody);
    return resBody;
   }

   export default acceptRequest;