"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Formik, useFormik } from "formik";
import { Checkbox } from "@/app/components/ui/checkbox";
import * as Yup from "yup";
import SignUp from "./api/signup";
import SignIn from "./api/signin";
import Input from "@/app/components/formComponents/Input";
import Member from "@/app/types/Member";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Logo from "@/app/images/TheSomethingSomethingCompanyLogoV2.svg";

// TYPE DEFINITION OF USER PROPS
type userauthprops = {
	params: { slug: string };
};

export default function UserAuthentication({ params }: userauthprops) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [showSignIn, setShowSignIn] = useState(true);
	const [terms, setTerms] = useState(true);

	useEffect(() => {
		if (searchParams.has("signin")) {
			searchParams.get("signin") === "true"
				? setShowSignIn(true)
				: setShowSignIn(false);
			router.replace("/auth");
		} else {
			setShowSignIn(false);
		}
	}, []);

	// FORMIK LOGIC

	const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
	const usernameRegex = /^[a-zA-Z0-9]+$/;

	const formik = useFormik({
		initialValues: {
			firstname: "e.g., John",
			lastname: "e.g., Doe",
			username: "e.g., johndoe",
			email: "e.g., example@email.com",
			password: "",
			confirmpassword: "",
			// organization: "",
		},
		onSubmit: (values: {
			firstname: string;
			lastname: string;
			username: string;
			email: string;
			password: string;
			// organization: string;
		}) => {
			submitSignUpData(values);
		},

		// SCHEMA VALIDATION
		validationSchema: Yup.object({
			firstname: Yup.string()
				.matches(/^[aA-zZ\s]+$/, "Please enter a valid firstname")
				.required(
					"You cannot leave this field empty! Please enter your firstname"
				),
			lastname: Yup.string()
				.matches(/^[aA-zZ\s]+$/, "Please enter a valid lastname")
				.required(
					"You cannot leave this field empty! Please enter your  lastname"
				),
			username: Yup.string().required(
				"You cannot leave this field empty! Please enter a username"
			),
			email: Yup.string()
				.email("Please enter a valid email address")
				.required(
					"You cannot leave this field empty! Please enter your email address"
				),
			password: Yup.string()
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
					"Must contain at least one uppercase, one lowercase, one number and one special character and be 8 characters or more in total"
				)
				.required(
					"You cannot leave this field empty! Please enter your password"
				),
		}),
	});

	const formikSignIn = useFormik({
		initialValues: {
			identifier: "",
			password: "",
		},
		onSubmit: (values: { identifier: string; password: string }) => {
			submitSignInData(values);
		},

		// SCHEMA VALIDATION
		validationSchema: Yup.object({
			identifier: Yup.string()
				.required(
					"This field cannot be empty! Please enter your valid username or email address."
				)
				.test(
					"is-username-or-email",
					"Please enter your username or email address",
					(value) => {
						if (!value) return false;
						return (
							emailRegex.test(value) || usernameRegex.test(value)
						);
					}
				),
			password: Yup.string().required(
				"You cannot leave this field empty! Please enter your password"
			),
		}),
	});

	const submitSignUpData = async (values: {
		firstname: string;
		lastname: string;
		username: string;
		email: string;
		password: string;
		// organization: string;
	}) => {
		try {
			if (!terms) {
				throw new Error("Please accept the terms and conditions");
			}

			const body: Member = {
				name: values.firstname + values.lastname,
				username: values.username,
				email: values.email,
				password: values.password,
				isorganization: false,
			};

			const response = await SignUp(body);

			console.log("Successs");
			console.log(response);

			router.push("/createProfile");
		} catch (error) {
			console.log(error);
		}
	};

	const submitSignInData = async (values: {
		identifier: string;
		password: string;
	}) => {
		try {
			const body = {
				identifier: values.identifier,
				password: values.password,
				isEmail: emailRegex.test(values.identifier),
			};
			const isEmail = emailRegex.test(values.identifier);

			const response = await SignIn(body);

			console.log("Logged In Successfully!");
			console.log(response);
			if (response.status == 205) {
				//router.push("/createProfile")
				//return;
			} else {
				// setLoggedIn(response);
				// router.push("/searchpage");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
		<section className="z-50 w-screen p-10 flex flex-row justify-between items-center text-[1rem]">
				<Link href={"./"}>
					<Image
						src={Logo}
						alt={"TheSomethingSomethingCompany"}
					></Image>
				</Link>
		</section>
		{showSignIn ? (
		<section className="grid grid-cols-1 tablet:grid-cols-2 p-0 m-0 w-full h-[50rem]">
			<div className="flex flex-col justify-center items-start py-0 px-20 w-full h-full">
				<h1 className="font-bold text-6xl mb-4">Sign In</h1>
				<form
					className="flex flex-col items-start my-4 w-full"
					onSubmit={formikSignIn.handleSubmit}
				>
					<Input
						label="Username"
						type="text"
						id="identifier"
						name="identifier"
						placeholder={formikSignIn.values.identifier}
						onChange={formikSignIn.handleChange}
						onBlur={formikSignIn.handleBlur}
					/>
					<Input
						label="Password"
						type="password"
						id="password"
						name="password"
						placeholder={formikSignIn.values.password}
						onChange={formikSignIn.handleChange}
						onBlur={formikSignIn.handleBlur}
					/>
					<div className="w-full flex justify-between items-end">
						<button
							className="h-fit my-2 p-2 text-xl font-normal rounded-lg bg-black border-2 border-black hover:bg-white text-white hover:text-black transition-all duration-300 ease-in-out"
							type="submit"
						>
							Sign In
						</button>
						<div className="flex flex-col items-end">
							<p className="text-xl font-normal pb-2">
								Not a member?
							</p>
							<button
								className="h-fit p-2 my-2 text-xl font-normal rounded-lg bg-black border-2 border-black hover:bg-white text-white hover:text-black transition-all duration-300 ease-in-out"
								onClick={() => setShowSignIn(!showSignIn)}
							>
								Sign Up
							</button>
						</div>
					</div>
				</form>
			</div>
			<div className="hidden tablet:flex flex-col justify-center items-center p-20 w-full h-full bg-blue-600">
				<div className="w-full">
					<h1 className="text-6xl text-white font-black pb-4">
						Welcome Back!
					</h1>
					<p className="text-3xl text-white font-normal pb-8">
						Sign in to start connecting with people around the
						world.
					</p>
				</div>
				<Image
					className="my-10"
					src="/signinundraw.svg"
					width={500}
					height={500}
					alt="signup"
				/>
			</div>
		</section>
	) : (
		<section className="grid grid-cols-1 tablet:grid-cols-2 p-0 m-0 h-fit w-full">
			<div className="hidden tablet:flex flex-col justify-center items-center p-20 w-fit h-full bg-green-600">
				<div className="w-full">
					<h1 className="text-6xl text-white font-black pb-4">
						Join our Community!
					</h1>
					<p className="text-3xl text-white font-normal pb-8">
						Connect with people around the world without worrying
						about your privacy.
					</p>
				</div>
				<Image
					className="my-10"
					src="/signupundraw.svg"
					width={600}
					height={600}
					alt="signup"
				/>
			</div>
			<div className="flex flex-col justify-center items-start p-20 w-full h-full">
				<h1 className="font-bold text-6xl mb-4">Sign Up</h1>
				<form
					className="flex flex-col items-start my-4 w-full"
					onSubmit={formik.handleSubmit}
				>
					<Input
						label={
							formik.touched.firstname && formik.errors.firstname
								? formik.errors.firstname
								: "Firstname"
						}
						type="text"
						id="firstname"
						name="firstname"
						placeholder={formik.values.firstname}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<Input
						label={
							formik.touched.lastname && formik.errors.lastname
								? formik.errors.lastname
								: `Lastname`
						}
						type="text"
						id="lastname"
						name="lastname"
						placeholder={formik.values.lastname}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<Input
						label={
							formik.touched.email && formik.errors.email
								? formik.errors.email
								: "Email"
						}
						type="email"
						id="email"
						name="email"
						placeholder={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<Input
						label="Password"
						type="password"
						id="password"
						name="password"
						placeholder={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.password && formik.errors.password ? (
						<span className="mb-8 pb-2 text-xl font-semibold">
							{formik.errors.password}
						</span>
					) : (
						""
					)}
					<Input
						label="Confirm Password"
						type="confirmpassword"
						id="confirmpassword"
						name="confirmpassword"
						placeholder={formik.values.confirmpassword}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<div className="mb-4 items-top flex  space-x-2">
						{/* <Checkbox id="organization" /> */}
						<div className="grid gap-1.5 leading-none">
							<label
								htmlFor="organization"
								className="text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Sign up as an Organization
							</label>
							<p className="text-xl text-muted-foreground">
								Check this to sign up as an Organization.
							</p>
						</div>
					</div>
					<div className="mb-4 items-top flex  space-x-2">
						{/* <Checkbox
              id="terms"
              checked={terms}
              onCheckedChange={(e) => setTerms(!terms)}
            /> */}
						<div className="grid gap-1.5 leading-none">
							<label
								htmlFor="terms"
								className="text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Accept terms and conditions
								<sup className="text-red-600">*</sup>
							</label>
							<p className="text-xl text-muted-foreground">
								You agree to our{" "}
								<a className="cursor-not-allowed">
									Terms of Service
								</a>{" "}
								and{" "}
								<a className="cursor-not-allowed">
									Privacy Policy
								</a>
								.
							</p>
						</div>
					</div>
					<div className="w-full flex justify-between items-end">
						<button
							className="h-fit my-2 p-2 text-xl font-normal rounded-lg bg-black border-2 border-black hover:bg-white text-white hover:text-black transition-all duration-300 ease-in-out"
							type="submit"
						>
							Sign Up
						</button>
						<div className="flex flex-col items-end">
							<p className="text-xl font-normal pb-2">
								Already a member?
							</p>
							<button
								className="h-fit p-2 my-2 text-xl font-normal rounded-lg bg-black border-2 border-black hover:bg-white text-white hover:text-black transition-all duration-300 ease-in-out"
								onClick={() => setShowSignIn(!showSignIn)}
							>
								Sign In
							</button>
						</div>
					</div>
				</form>
			</div>
		</section>
	)}
	</>
	);
}
