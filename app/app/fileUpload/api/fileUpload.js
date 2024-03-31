//BARELY WORKS BARELY WORKS BARELY WORKS BARELY WORKS BARELY WORKS BARELY WORKS BARELY WORKS  

export async function fileUpload(data){
    const response = await fetch('http://499-new-lb-420614602.ca-central-1.elb.amazonaws.com:6969/S3upload/api', {
        method: 'POST',
        body: data,
        // credentials: "include",
    });

    let resBody = await response.json(); // Retrieve response body and turn into JSON object
    // console.log("[RESPONSE BODY CREATE PROFILE]:") 
    console.log(resBody);
    return resBody;
   }

   export default fileUpload;

//BARELY WORKS BARELY WORKS BARELY WORKS BARELY WORKS BARELY WORKS BARELY WORKS BARELY WORKS 