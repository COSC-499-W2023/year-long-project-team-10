export default async function blockUser(data){
    const response = await fetch('http://localhost:6969/blockUser/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: "include",
    });

    let resBody = await response.json(); // Retrieve response body and turn into JSON object
    console.log(resBody);
    return resBody.data;
   }