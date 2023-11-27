<<<<<<< HEAD:app/app/auth/api/signup.ts
import AuthResponse from "../../types/AuthResponse";
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
  let resBody: AuthResponse = await response.json();
  console.log("[MIDDLEMAN]:\n" + JSON.stringify(resBody));
  return resBody;
}
=======
export default async function SignUp(values: {
  name: string;
  email: string;
  username: string;
  password: string;
  isorganization: boolean;
}) {
  const response = await fetch(`/auth/signup/api/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
    cache: "no-cache",
  });
  let res = JSON.parse(await response.text());
  return res.data ? res.data.id : res.status;
}
>>>>>>> 905c9c7f29a6fee09c93efc774d218ea876bc0ac:app/app/auth/[slug]/api/signup.ts
