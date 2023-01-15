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

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.user = null;
			state.isAuth = false;
		},
	},
	extraReducers(builder) {
		builder.addCase(onLogin.fulfilled, (state, action) => {
			state.user = action.payload;
			state.isAuth = true;
		});
	},
});

const { actions, reducer } = authSlice;
export default reducer;
export const { logout } = actions;
