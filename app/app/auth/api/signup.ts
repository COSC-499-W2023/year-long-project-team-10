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
    data: {
      id: string;
    } | null;
    status: number;
    message: string;
    pgErrorMessage: any;
  } = await response.json();
  console.log(resBody);
  return resBody;
  // if (resBody.status == 201) return resBody.data;
  // else if (resBody.status == 422 || resBody.status == 500) return false;
}
