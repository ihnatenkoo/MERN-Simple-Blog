import axios from '../../api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: {},
	isAuth: false,
	authError: {},
	registerError: {},
};

export const onRegister = createAsyncThunk(
	'auth/REGISTER',
	async (registerData, thunkApi) => {
		return axios
			.post('/auth/register', registerData)
			.then((response) => response.data)
			.catch((error) =>
				thunkApi.rejectWithValue(error?.response?.data || error)
			);
	}
);

export const onLogin = createAsyncThunk(
	'auth/LOGIN',
	async (loginData, thunkApi) => {
		return axios
			.post('/auth/login', loginData)
			.then((response) => response.data)
			.catch((error) =>
				thunkApi.rejectWithValue(error?.response?.data || error)
			);
	}
);

export const onCheckAuth = createAsyncThunk('auth/checkAuth', async () => {
	const { data } = await axios.get('/auth/me');
	return data;
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			localStorage.removeItem('token');
			state.user = null;
			state.isAuth = false;
		},
	},
	extraReducers(builder) {
		builder.addCase(onRegister.fulfilled, (state, action) => {
			const { token, ...userInfo } = action.payload;
			localStorage.setItem('token', action.payload.token);
			state.user = userInfo;
			state.isAuth = true;
			state.registerError = {};
		});
		builder.addCase(onRegister.rejected, (state, action) => {
			state.registerError = action.payload;
		});

		builder.addCase(onLogin.fulfilled, (state, action) => {
			const { token, ...userInfo } = action.payload;
			localStorage.setItem('token', action.payload.token);
			state.user = userInfo;
			state.isAuth = true;
			state.authError = {};
		});
		builder.addCase(onLogin.rejected, (state, action) => {
			state.authError = action.payload;
		});

		builder.addCase(onCheckAuth.fulfilled, (state, action) => {
			const { token, ...userInfo } = action.payload;
			localStorage.setItem('token', action.payload.token);
			state.user = userInfo;
			state.isAuth = true;
		});
		builder.addCase(onCheckAuth.rejected, (state) => {
			localStorage.removeItem('token');
			state.user = {};
			state.isAuth = false;
		});
	},
});

const { actions, reducer } = authSlice;
export default reducer;
export const { logout } = actions;
