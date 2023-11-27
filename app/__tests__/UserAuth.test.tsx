import fetchMock from "jest-fetch-mock";
import SignUp from "../app/auth/api/signup";
import SignIn from "../app/auth/api/signin";
import AuthResponse from "@/app/types/AuthResponse";
import Member from "@/app/types/Member";

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("Create an Account", () => {
  it("Ensure profile can be created given the correct credentials", async () => {
    const request: Member = {
      name: "John Murphy Doe",
      username: "JMurphyDoe",
      email: "j.murphy.doe@email.com",
      password: "ThisIsTheSafestPasswordEver@123456#",
      isorganization: false,
    };
    const response: AuthResponse = await SignUp(request);
    console.log(response);
    expect(response.status).toEqual(201);
    expect(response.message).toEqual("User SignUp Successful");
    expect(response.pgErrorMessage).toBeFalsy();
    expect(response.data).toBeTruthy();
  });
  it("Ensure user can sign in using email given the correct credentials", async () => {
    const request = {
      identifier: "j.murphy.doe@email.com",
      password: "ThisIsTheSafestPasswordEver@123456#",
      isEmail: true,
    };
    const response: AuthResponse = await SignIn(request);
    console.log(response);
    expect(response.status).toEqual(201);
    expect(response.message).toEqual("User SignIn Successful");
    expect(response.pgErrorMessage).toBeFalsy();
    expect(response.data).toBeTruthy();
  });
  it("Ensure user can sign in using username given the correct credentials", async () => {
    const request = {
      identifier: "JMurphyDoe",
      password: "ThisIsTheSafestPasswordEver@123456#",
      isEmail: false,
    };
    const response: AuthResponse = await SignIn(request);
    console.log(response);
    expect(response.status).toEqual(201);
    expect(response.message).toEqual("User SignIn Successful");
    expect(response.pgErrorMessage).toBeFalsy();
    expect(response.data).toBeTruthy();
  });
});
