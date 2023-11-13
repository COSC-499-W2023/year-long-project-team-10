export default async function SignUp(values: {
  name: string;
  email: string;
  username: string;
  password: string;
  isorganization: boolean;
}) {
  const response = await fetch(`http://localhost:6969/signup/api`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
    cache: "no-cache",
  });
  let resBody: {
    data: any;
    status: number;
    message: string;
  } = await response.json();
  console.log(resBody.message);
  console.log(resBody.status);
  if (resBody.status == 201) return resBody.data;
  else if (resBody.status == 422 || resBody.status == 500) return false;
}
