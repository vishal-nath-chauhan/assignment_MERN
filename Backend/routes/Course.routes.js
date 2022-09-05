import { Router } from "express";
import CourseController from "../controllers/Course.controller.js";
import UserController from "../controllers/User.controller.js";

const router = Router();

router.post("/add", CourseController.addCourse).get("/", UserController.verifyAuthToken, CourseController.getOneCourse);
router.get("/all", UserController.verifyAuthToken, CourseController.getAllCourses);

export default router;
