import AuthResponse from "@/app/types/AuthResponse";
export default async function SignUp(values: {
	username: string;
	email: string;
	password: string;
}) {
	const response = await fetch(`http://499-new-lb-420614602.ca-central-1.elb.amazonaws.com:6969/signup/api`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(values),
		cache: "no-cache",
		credentials: "include",
	});
	let resBody: AuthResponse = await response.json();
	console.log("[MIDDLEMAN]:\n" + JSON.stringify(resBody));
	return resBody;
}
