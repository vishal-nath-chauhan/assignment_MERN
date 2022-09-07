import React, { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Header from "../../components/Header/Header";
import colors from "../../utils/designSystem.js/colors";
import "./SignIn.css";
import { useDispatch } from "react-redux";
import { loginUser, signUpUser } from "../../reducers/UserReducer";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
	const [userDetails, setUserDetails] = useState({ name: "", email_id: "", password: "" });
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleUserDetails = (e) => {
		let idd = e.target.id;
		let value = e.target.value;
		setUserDetails({ ...userDetails, [idd]: value });
	};

	const navigateToCourses = () => navigate("/courses");

	const handleLogin = () => {
		let email = userDetails.email_id;
		let email_regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

		if (!email.match(email_regex)) {
			alert("Enter valid email");
			return;
		}

		if (!userDetails.name.length && !showLogin) {
			alert("Enter Valid Name");
			return;
		}

		if (!userDetails.password.length) {
			alert("Enter Valid Password");
			return;
		}

		if (showLogin) {
			dispatch(
				loginUser({
					payload: {
						email_id: userDetails.email_id,
						password: userDetails.password,
					},
					callback: navigateToCourses,
				})
			);
		} else {
			dispatch(
				signUpUser({
					payload: {
						name: userDetails.name,
						email_id: userDetails.email_id,
						password: userDetails.password,
					},
					callback: navigateToCourses,
				})
			);
		}
	};

	const [showLogin, setShowLogin] = useState(false);
	const handleShowLogin = (e) => (e.target.id === "login" ? setShowLogin(true) : setShowLogin(false));

	const buttonLabel = useMemo(() => {
		return showLogin ? "Login" : "SignUp";
	}, [showLogin]);

	const LinkLabel = useMemo(() => {
		return !showLogin ? "Login" : "SignUp";
	}, [showLogin]);

	return (
		<Box sx={{ backgroundColor: "#F5F6F7" }}>
			<Header />
			<Stack spacing={6} sx={{ height: "100%", margin: "3em 20em", alignItems: "start", width: "60%", padding: "0.5em 0em 2em 0em	" }}>
				<div style={{ borderTop: "2px solid black", width: "100% " }}>&nbsp;</div>
				{showLogin ? (
					<>
						<input id="email_id" onChange={handleUserDetails} placeholder="Enter Email" className="input" />
						<input id="password" onChange={handleUserDetails} placeholder="Enter Password" className="input" />
					</>
				) : (
					<>
						<input id="name" onChange={handleUserDetails} placeholder="Enter Name" className="input" />
						<input id="email_id" onChange={handleUserDetails} placeholder="Enter Email" className="input" />
						<input id="password" onChange={handleUserDetails} placeholder="Enter Password" className="input" />
					</>
				)}

				<button onClick={handleLogin} className="cta2" style={{ margin: "20px", backgroundColor: colors.themeYellow, border: "3px solid orange" }}>
					{buttonLabel}
				</button>
				<p className="informative">
					Already have an account ?{" "}
					<span id={showLogin ? "signup" : "login"} onClick={handleShowLogin} className="linkButton">
						{LinkLabel}
					</span>
				</p>
			</Stack>
		</Box>
	);
};

export default React.memo(SignIn);
