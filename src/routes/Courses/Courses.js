import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Header from "../../components/Header/Header";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../reducers/CourseReducer";
import STATUS from "../../utils/constants";

const Courses = () => {
	const dispatch = useDispatch();
	const getAllCourseStatus = useSelector((state) => state.course.getAllCourseStatus);
	const allCourses = useSelector((state) => state.course.allCourses);

	const isApiCalled = useRef(false);

	//  AS in React 18 useEffect calls itself twice
	useEffect(() => {
		if (!isApiCalled.current) dispatch(getAllCourses());
		return () => (isApiCalled.current = true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Box sx={{ backgroundColor: "#F5F6F7" }}>
			<Header />
			<Stack spacing={3} sx={{ margin: "3em 20em", alignItems: "start", width: "60%" }}>
				<Typography sx={{ fontSize: "2em", fontFamily: "Lato", fontWeight: 600 }}>Welcome to freecodecamp.org</Typography>
				<Typography sx={{ fontSize: "1em", fontWeight: 200 }}>I have not failed.I've just found 10,000 ways that won't work.</Typography>
				{allCourses && allCourses.length ? allCourses.map((courseItem) => <CourseItem key={courseItem._id} course={courseItem} />) : "No Courses Found"}
			</Stack>
		</Box>
	);
};

const CourseItem = React.memo((props) => {
	const { course } = props;
	return (
		<Stack direction={"row"} sx={{ width: "100%", justifySelf: "stretch", justifyContent: "start", alignItems: "center", border: "2px solid black", padding: "0.5em", backgroundColor: "#D0D0D5" }}>
			<img alt="course" style={{ height: "2.5em", marginRight: "1em" }} src="/assets/images/course.png" />
			{course.title}| {course.duration}
		</Stack>
	);
});

export default React.memo(Courses);
