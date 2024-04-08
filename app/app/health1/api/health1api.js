
export async function health1() {
    const response = await fetch('http://499-new-lb-420614602.ca-central-1.elb.amazonaws.com:6969/health1/api', {
        method: 'POST',
        // body: JSON.stringify("in the api"), 
        // headers: {
        //     'Content-Type': 'application/json'
        // }
    });

    let resBody = await response.json();
    console.log(resBody);
    return resBody.body;
}

export default health1;

//BARELY WORKS BARELY WORKS BARELY WORKS BARELY WORKS BARELY WORKS BARELY WORKS BARELY WORKS 