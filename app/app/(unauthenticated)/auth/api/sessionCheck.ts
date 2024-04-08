import AuthResponse from "../../../types/AuthResponse";
export default async function SessionCheck() {
const dotenv = require("dotenv");
dotenv.config();

	const response = await fetch(`http://499-new-lb-420614602.ca-central-1.elb.amazonaws.com:6969/sessionCheck/api`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: null,
		cache: "no-cache",
		credentials: "include",
	});
	let resBody: AuthResponse = await response.json();
	console.log(resBody.message);
	return resBody;
}
