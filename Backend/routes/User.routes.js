import { Router } from "express";
import UserController from "../controllers/User.controller.js";

const router = Router();
router.post("/signup", UserController.signUpUser).post("/login", UserController.signInUser);
router.delete(
	"/",
	UserController.verifyAuthToken,
	UserController.removeUser
);

export default router;
