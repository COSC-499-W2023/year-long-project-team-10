export default async function SignIn(values: {
  identifier: string;
  password: string;
  isEmail: boolean;
}) {
  const response = await fetch(`http://localhost:6969/signin/api`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
    cache: "no-cache",
  });
  let resBody: {
    data: {
      id: string | null;
    };
    status: number;
    message: string;
  } = await response.json();
  if (resBody.status == 201) return resBody.data;
  else if (resBody.status == 422 || resBody.status == 500) return false;
}
