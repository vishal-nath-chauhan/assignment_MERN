import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export function generateAccessToken(data) {
	return jwt.sign({ id: data.id }, process.env.TOKEN, { expiresIn: "1h" });
}

export function verifyToken(data) {
	const isVerified = jwt.verify(data, process.env.TOKEN);
	return Boolean(isVerified);
}
export const convertToHash = async (data) => {
	return await bcrypt.hash(String(data), 12);
};

export const compareHash = async (data, hashedData) => {
	const result = await bcrypt.compare(data, hashedData);
	return result;
};
