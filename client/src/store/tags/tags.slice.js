import axios from '../../api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	tags: [],
	isLoading: false,
	isError: false,
};

export const getLastTags = createAsyncThunk('tags/GET_LAST', async () => {
	const { data } = await axios.get('/tags');
	return data;
});

const tagsSlice = createSlice({
	name: 'tags',
	initialState,
	reducer: {},
	extraReducers(builder) {
		builder.addCase(getLastTags.pending, (state) => {
			state.tags = [];
			state.isLoading = true;
			state.isError = false;
		});
		builder.addCase(getLastTags.fulfilled, (state, action) => {
			state.isLoading = false;
			state.tags = action.payload;
		});
		builder.addCase(getLastTags.rejected, (state) => {
			state.tags = [];
			state.isLoading = false;
			state.isError = true;
		});
	},
});

const { reducer } = tagsSlice;
export default reducer;
