import axios from '../../api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	articles: [],
	isLoading: false,
	isError: false,
};

export const getAllArticles = createAsyncThunk('articles/GET_ALL', async () => {
	const { data } = await axios.get('/articles');
	return data;
});

const articleSlice = createSlice({
	name: 'articles',
	initialState,
	reducer: {},
	extraReducers(builder) {
		builder.addCase(getAllArticles.pending, (state) => {
			state.articles = [];
			state.isLoading = true;
			state.isError = false;
		});
		builder.addCase(getAllArticles.fulfilled, (state, action) => {
			state.isLoading = false;
			state.articles = action.payload;
		});
		builder.addCase(getAllArticles.rejected, (state) => {
			state.articles = [];
			state.isLoading = false;
			state.isError = true;
		});
	},
});

const { actions, reducer } = articleSlice;
export default reducer;
