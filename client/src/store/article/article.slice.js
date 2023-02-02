import axios from '../../api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	articles: [],
	isLoading: false,
	isError: false,
	currentTag: '',
	sort: 'new',
};

export const getArticles = createAsyncThunk(
	'articles/GET_ALL',
	async ({ sort, currentTag }) => {
		const { data } = await axios.get(
			`/articles?sort=${sort}&tag=${currentTag}`
		);
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
	reducers: {
		SET_TAG: (state, action) => {
			state.currentTag = action.payload;
		},
		SET_SORT: (state, action) => {
			state.sort = action.payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(getArticles.pending, (state) => {
			state.articles = [];
			state.isLoading = true;
			state.isError = false;
		});
		builder.addCase(getArticles.fulfilled, (state, action) => {
			state.isLoading = false;
			state.articles = action.payload;
		});
		builder.addCase(getArticles.rejected, (state) => {
			state.articles = [];
			state.isLoading = false;
			state.isError = true;
		});

		builder.addCase(deleteArticle.fulfilled, (state, action) => {
			state.articles = state.articles.filter((a) => a._id !== action.payload);
		});
	},
});

const { reducer, actions } = articleSlice;
export const { SET_TAG, SET_SORT } = actions;
export default reducer;
