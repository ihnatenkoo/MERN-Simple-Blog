import axios from '../../api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	lastComments: [],
	isLoading: false,
	isError: false,
};

export const getLastComments = createAsyncThunk(
	'lastComments/GET',
	async () => {
		const { data } = await axios.get(`/comment/last`);
		return data;
	}
);

const lastCommentsSlice = createSlice({
	name: 'lastComments',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(getLastComments.pending, (state) => {
			state.lastComments = [];
			state.isLoading = true;
			state.isError = false;
		});
		builder.addCase(getLastComments.fulfilled, (state, action) => {
			state.isLoading = false;
			state.lastComments = action.payload;
		});
		builder.addCase(getLastComments.rejected, (state) => {
			state.lastComments = [];
			state.isLoading = false;
			state.isError = true;
		});
	},
});

const { reducer } = lastCommentsSlice;
export default reducer;
