import User from "../models/User.schema.js";
import { compareHash, convertToHash, generateAccessToken, verifyToken } from "../utils/helper.functions.js";
import AppError, { ErrorWrapper } from "../utils/AppError.js";

const signUpUser = ErrorWrapper(async (req, res, next) => {
	const userDetails = req.body;
	if (!userDetails)
		res.status(400).json({
			success: false,
			message: "Enter valid Input",
		});

	let { name, email_id, password } = req.body;
	// check user exists
	const isUserExists = await User.findOne({ email_id });

	if (isUserExists) next(new AppError("User already exists", 400)); // send error

	if (!isUserExists) {
		name = String(name).toLowerCase();
		email_id = String(email_id).toLowerCase();
		let hashedPassword = await convertToHash(password);
		const authToken = generateAccessToken({ id: email_id });
		const result = await User.create({ name, email_id, password: hashedPassword });
		if (!result) next(new AppError("Unable to add User", 500));
		res.status(200).json({
			success: true,
			data: {
				authToken,
				user: { name: result.name, email_id: result.email_id, _id: result._id },
			},
		});
	}
});

const removeUser = ErrorWrapper(async (req, res, next) => {
	const userId = req.query;
	if (!userId.id) next(new AppError("User Id Not Found", 404)); // send error
	const result = await User.findByIdAndDelete({ _id: userId.id });
	if (!result) next(new AppError("User not Found", 404));
	if (result)
		res.status(200).json({
			success: true,
			data: result,
		});
});

const signInUser = ErrorWrapper(async (req, res, next) => {
	const userDetails = req.body;
	if (!userDetails)
		res.status(400).json({
			success: false,
			message: "Enter valid Input",
		});

	let { email_id, password } = req.body;

	// check user exists
	const isUserExists = await User.findOne({ email_id });
	if (!isUserExists) next(new AppError("User Not Found", 404)); // send error user not found

	if (isUserExists) {
		email_id = String(email_id).toLowerCase();
		let dbPassword = isUserExists.password;
		let passwordVerification = await compareHash(password, dbPassword);

		if (!passwordVerification) next(new AppError("Authentication Failed ", 401)); // send error

		const authToken = generateAccessToken({ id: isUserExists._id });
		res.status(200).json({
			success: true,
			data: {
				authToken,
				user: { name: isUserExists.name, email_id: isUserExists.email_id, _id: isUserExists._id },
			},
		});
	}
});

const verifyAuthToken = ErrorWrapper(async (req, res, next) => {
	let authToken = req.headers["authorization"];
	if (!authToken) next(new AppError("Authtoken Not Found ", 404)); //send error
	if (authToken) {
		authToken = authToken.split(" ")[1];

		const isVerified = verifyToken(authToken);
		if (!isVerified) next(new AppError("Unauthorized Access ", 401)); // send error

		if (isVerified) next();
	}
});

const index = {
	signUpUser,
	removeUser,
	signInUser,
	verifyAuthToken,
};

export default index;
