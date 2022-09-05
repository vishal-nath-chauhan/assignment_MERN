import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
	title: { type: String, required: [true, "Course Title is Required"] },
	duration: {
		type: String,
		required: [true, "Course Duration is Required"],
	},
});

const Course = mongoose.model("course", CourseSchema);
export default Course;
