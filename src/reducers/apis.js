import { create } from "apisauce";
import URL from "./URL";
const BASE_URL = "http://localhost:5000/";

let api = create({
	baseURL: BASE_URL,
	headers: {
		Accept: "application/json",
		"Cache-Control": "no-cache",
		"Content-Type": "application/json",
	},
	timeout: 45000,
});

export const setAuthorizationHeader = (access_token) => api.setHeader("Authorization", "Bearer " + access_token);

export const removeAuthorizationHeader = () => {
	delete api.headers["Authorization"];
};



// User APIS

const signUpUser = (payload) => api.post(URL.signUp, payload);
const loginUser = (payload) => api.post(URL.login, payload);

// Course APIS
const getAllCourses = (payload) => api.get(URL.course, payload);

const apis = {
	signUpUser,
	loginUser,
	getAllCourses,
};

export default apis;
