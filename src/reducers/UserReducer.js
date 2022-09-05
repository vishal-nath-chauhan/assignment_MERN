import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apis from "./apis";
import STATUS from "../utils/constants";
import { CookieHandler } from "../utils/constants";
import { setAuthorizationHeader } from "./apis";

export const loginUser = createAsyncThunk("loginUser", async (payload, thunkAPI) => {
	const response = await apis.loginUser(payload.payload);
	const { ok, problem, data } = response;
	if (ok) {
		if (payload.callback) payload.callback();
		return data;
	} else {
		return thunkAPI.rejectWithValue(problem, { error: data });
	}
});

export const signUpUser = createAsyncThunk("signUpUser", async (payload, thunkAPI) => {
	const response = await apis.signUpUser(payload.payload);
	const { ok, problem, data } = response;
	if (ok) {
		if (payload.callback) payload.callback();
		return data;
	} else {
		return thunkAPI.rejectWithValue(problem, { error: data });
	}
});

const initialState = {
	loginStatus: STATUS.NOT_STARTED,
	signUpStatus: STATUS.NOT_STARTED,
};

const useSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: {
		[loginUser.pending]: (state) => {
			state.loginStatus = STATUS.FETCHING;
		},
		[loginUser.rejected]: (state, action) => {
			state.loginStatus = STATUS.FAILED;
			alert(action.meta.error.message);
		},
		[loginUser.fulfilled]: (state, action) => {
			state.loginStatus = STATUS.SUCCESS;
			if (action.payload.success) {
				CookieHandler("set", { name: "authToken", value: action.payload.data.authToken, days: 1 });
				CookieHandler("set", { name: "userData", value: action.payload.data.user, days: 1 });
				setAuthorizationHeader(action.payload.data.authToken);
			}
		},
		[signUpUser.pending]: (state) => {
			state.signUpStatus = STATUS.FETCHING;
		},
		[signUpUser.rejected]: (state, action) => {
			state.signUpStatus = STATUS.FAILED;
			alert(action.meta.error.message);
		},
		[signUpUser.fulfilled]: (state, action) => {
			state.signUpStatus = STATUS.SUCCESS;
			if (action.payload.success) {
				CookieHandler("set", { name: "authToken", value: action.payload.data.authToken, days: 1 });
				CookieHandler("set", { name: "userData", value: action.payload.data.user, days: 1 });
				setAuthorizationHeader(action.payload.data.authToken);
			}
		},
	},
});

export const userReducer = useSlice.reducer;
