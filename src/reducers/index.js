import { userReducer } from "./UserReducer";
import { courseReducer } from "./CourseReducer";
import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
	user: userReducer,
	course: courseReducer,
});

const appReducer = (state, action) => {
	return reducer(state, action);
};

export default appReducer;
