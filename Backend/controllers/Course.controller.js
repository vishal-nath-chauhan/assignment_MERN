import AppError, { ErrorWrapper } from "../utils/AppError.js";
import Course from "../models/Course.schema.js";

const getAllCourses = ErrorWrapper(async (req, res, next) => {
	const result = await Course.find();
	if (!result) next(new AppError("Unable to fetch courses", 500));
	res.status(200).json({
		success: true,
		data: result,
	});
});

// dummy data for database
const data = [
	{
		title: "Intro to Javascript",
		duration: "2h",
	},
	{
		title: "Intro to Python",
		duration: "12h",
	},
	{
		title: "Intro to Machine Learning",
		duration: "50h",
	},
	{
		title: "Intro to Data Science",
		duration: "5h",
	},
];

const addCourse = ErrorWrapper(async (req, res, next) => {
	const result = await Promise.all(
		data.map(async (item) => {
			return await Course.create(item);
		})
	);

	res.status(200).json({
		success: true,
		data: result,
	});
});

const getOneCourse = ErrorWrapper(async (req, res, next) => {
	const courseInput = req.query;

	if (!courseInput) next(new AppError("Enter Valid Input", 500));

	const filter = {};

	if (courseInput.title) filter["title"] = { $regex: courseInput.title, $options: "i" };
	if (courseInput.id) filter["_id"] = courseInput.id;

	const result = await Course.find(filter);

	if (!result) next(new AppError("Course Not Found", 404));

	res.status(200).json({
		success: true,
		data: result,
	});
});

const index = {
	getAllCourses,
	getOneCourse,
	addCourse,
};

export default index;
