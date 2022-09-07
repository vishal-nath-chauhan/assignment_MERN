import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/system";
import "./App.css";

import { useEffect, lazy, Suspense } from "react";
import { setAuthorizationHeader } from "./reducers/apis";
import { CookieHandler } from "./utils/constants";

const LoadingComponent = (props) => {
	const { children } = props;
	return <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>;
};

const Home = lazy(() => import("./routes/Home/Home"));
const Courses = lazy(() => import("./routes/Courses/Courses"));
const SignIn = lazy(() => import("./routes/SignIn/SignIn"));

function App() {
	useEffect(() => {
		const header = CookieHandler("get", { name: "authToken" });
		if (header) setAuthorizationHeader(header);
	}, []);

	return (
		<Box sx={{ width: "100%" }}>
			<Routes>
				<Route path="/" element={<LoadingComponent children={<Home />} />} />
				<Route path="/login" element={<LoadingComponent children={<SignIn />} />} />
				<Route path="/courses" element={<LoadingComponent children={<Courses />} />} />
			</Routes>
		</Box>
	);
}

export default React.memo(App);
