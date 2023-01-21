import axios from '../../api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null,
	isAuth: false,
};

export const onLogin = createAsyncThunk('auth/LOGIN', async (loginData) => {
	const { data } = await axios.post('/auth/login', loginData);
	return data;
});

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
		builder.addCase(onLogin.fulfilled, (state, action) => {
			const { token, ...userInfo } = action.payload;
			localStorage.setItem('token', action.payload.token);
			state.user = userInfo;
			state.isAuth = true;
		});
		builder.addCase(onLogin.rejected, (state) => {
			localStorage.removeItem('token');
			state.user = null;
			state.isAuth = false;
		});

		builder.addCase(onCheckAuth.fulfilled, (state, action) => {
			state.user = action.payload;
			state.isAuth = true;
		});
		builder.addCase(onCheckAuth.rejected, (state) => {
			state.user = null;
			state.isAuth = false;
		});
	},
});

const { actions, reducer } = authSlice;
export default reducer;
export const { logout } = actions;
