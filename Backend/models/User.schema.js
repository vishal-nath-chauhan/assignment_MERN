import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	name: { type: String, required: [true, "Name is Required"] },
	email_id: {
		type: String,
		required: [true, "Email is Required"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Password is Required"],
	},
});

const User = mongoose.model("user", UserSchema);
export default User;
