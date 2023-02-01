import axios from '../../api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	articles: [],
	isLoading: false,
	isError: false,
};

export const getAllArticles = createAsyncThunk(
	'articles/GET_ALL',
	async (sort) => {
		const { data } = await axios.get(`/articles?sort=${sort}`);
		return data;
	}
);

export const deleteArticle = createAsyncThunk('articles/DELETE', async (id) => {
	const { data } = await axios.delete(`/articles/${id}`);
	return data._id;
});

const articleSlice = createSlice({
	name: 'articles',
	initialState,
	reducers: {},
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
		builder.addCase(deleteArticle.fulfilled, (state, action) => {
			state.articles = state.articles.filter((a) => a._id !== action.payload);
		});
	},
});

const { reducer } = articleSlice;
export default reducer;
