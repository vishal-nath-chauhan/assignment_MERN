import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import colors from "../../utils/designSystem.js/colors";
import './Header.css'

export const SearchBar = () => {
	return (
		// <TextField
		// sx={{backgroundColor:colors.searchBarBackground,fontSize:"0.5em !important",color:"white !important",fontFamily: `"Lato" sans-serif`}}
		// 	id="input-with-icon-textfield"
		// 	InputProps={{
		// 		startAdornment: (
		// 			<InputAdornment position="start">
		// 				<AccountCircle sx={{color:"white"}} />
		// 			</InputAdornment>
		// 		),

		// 	}}
		// 	inputProps={{
		// 		'aria-label': 'weight',
		// 		color:"white"
		// 	  }}
		// 	size='small'
		// 	variant="outlined"
		// />
		<input
			style={{
				width: "15%",
				backgroundColor: colors.searchBarBackground,
				fontFamily: `"Lato" sans-serif`,
				color: "white",
				boxShadow: "none !important",
				lineHeight: "1em",
				display: "inline-block",
				fontSize: "15px",
				height: "26px",
				marginTop: "6px",
				padding: "0 10px 0 30px",
				border:"none"
			}}
			className='icon'
		/>
	);
};
