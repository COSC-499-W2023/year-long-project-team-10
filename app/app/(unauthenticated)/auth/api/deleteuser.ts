import AuthResponse from "../../types/AuthResponse";
export default async function DeleteUser(values: { username: string }) {
  const response = await fetch(`http://499-new-lb-420614602.ca-central-1.elb.amazonaws.com:6969/deleteuser/api`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
    cache: "no-cache",
  });
  let resBody: AuthResponse = await response.json();
  console.log(resBody.message);
  return resBody;
}
