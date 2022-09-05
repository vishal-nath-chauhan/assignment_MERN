import React from "react";
import Stack from "@mui/system/Stack";
import "./Header.css";
import { SearchBar } from "./Header.components";
import colors from "../../utils/designSystem.js/colors";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const navigate = useNavigate();
	const navigateToSignIn = () => navigate("/login");
	const navigateToHome = () => navigate("/");


	return (
		<Stack direction={"row"} spacing={30} sx={{ backgroundColor: colors.headerBackground, padding: "2px 1em", justifyContent: "space-between", alignItems: "center" }}>
			<SearchBar />

			<img onClick={navigateToHome} style={{ height: "1.8em" }} alt="freecodecamp logo" src="/assets/images/logo.PNG" />

			<Stack direction={"row"} spacing={2} sx={{ justifyContent: "space-between" }}>
				<button className="header_button" style={{ backgroundColor: colors.headerBackground, border: "1px solid", color: "white" }}>
					Menu
				</button>
				<button onClick={navigateToSignIn} className="header_button" style={{ backgroundColor: colors.themeYellow }}>
					SignIn
				</button>
			</Stack>
		</Stack>
	);
};

export default React.memo(Header);
