export async function sendMessage(data){
    const response = await fetch('http://localhost:6969/sendMessage/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        cache: "no-cache"

    });

    let resBody = await response.json(); // Retrieve body and turn into JSON object
    return resBody;
   }
   export default sendMessage