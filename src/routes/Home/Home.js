import React from "react";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import Header from "../../components/Header/Header";
import { Box } from "@mui/system";
import "./Home.css";
import colors from "../../utils/designSystem.js/colors";
const Home = () => {
	return (
		<Box sx={{ textAlign: "center" }}>
			<Box sx={{ backgroundColor: "#F5F6F7" }}>
				<Header />
				<Stack spacing={3} sx={{ margin: "3em 20em", alignItems: "start", width: "60%" }}>
					<Typography sx={{ fontSize: "3em", fontFamily: "Lato", fontWeight: 600 }}>Learn to code — for free.</Typography>
					<Typography sx={{ fontSize: "3em", fontFamily: "Lato", fontWeight: 600 }}>Build projects.</Typography>
					<Typography sx={{ fontSize: "3em", fontFamily: "Lato", fontWeight: 600 }}>Earn certifications.</Typography>
					<Typography sx={{ fontSize: "1.5em", fontFamily: "Lato", fontWeight: 600 }}>
						Since 2014, more than 40,000 freeCodeCamp.org graduates have gotten jobs at tech companies including:
					</Typography>
					<img alt="brands" src="/assets/images/brands.PNG" />
				</Stack>
			</Box>
			<button style={{ backgroundColor: colors.themeYellow, border: "3px solid orange" }} className="cta">
				Get Started (it's free)
			</button>
		</Box>
	);
};

export default Home;
