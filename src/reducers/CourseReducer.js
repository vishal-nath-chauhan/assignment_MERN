import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apis from "./apis";
import STATUS from "../utils/constants";

export const getAllCourses = createAsyncThunk("getAllCourses", async (payload, thunkAPI) => {
	const response = await apis.getAllCourses(payload);
	const { ok, problem, data } = response;
	if (ok) {
		return data;
	} else {
		return thunkAPI.rejectWithValue(problem);
	}
});

const initialState = {
	getAllCourseStatus: STATUS.NOT_STARTED,
};

const courseSlice = createSlice({
	name: "course",
	initialState,
	reducers: {},
	extraReducers: {
		[getAllCourses.pending]: (state) => {
			state.getAllCourseStatus = STATUS.FETCHING;
		},
		[getAllCourses.rejected]: (state) => {
			state.getAllCourseStatus = STATUS.FAILED;
		},
		[getAllCourses.fulfilled]: (state, action) => {
			if (action.payload.success) {
				state.allCourses = action.payload.data;
				state.getAllCourseStatus = STATUS.SUCCESS;
			}
		},
	},
});

export const courseReducer = courseSlice.reducer;
