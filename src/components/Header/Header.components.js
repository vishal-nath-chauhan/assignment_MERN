import React from "react";
import colors from "../../utils/designSystem.js/colors";
import "./Header.css";
import { useDispatch } from "react-redux";
import { searchCourse } from "../../reducers/CourseReducer";

export const SearchBar = () => {
	const dispatch = useDispatch();
	let timer;

	const handleCourseSearch = (e) => {
		const valueToSearch = e.target.value;

		// DEBOUNCING After every 300ms
		if (valueToSearch && valueToSearch.trim().length) {
			clearTimeout(timer);
			timer = setTimeout(() => {
				dispatch(searchCourse({ title: valueToSearch }));
			}, 300);
		}
	};
	return (
		<input
			onChange={handleCourseSearch}
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
				border: "none",
			}}
			className="icon"
		/>
	);
};
