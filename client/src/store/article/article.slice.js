import axios from '../../api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	articles: [],
	openArticle: {},
	lastComments: [],
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

export const getOneArticle = createAsyncThunk(
	'articles/GET_ONE',
	async (id) => {
		const { data } = await axios.get(`/articles/${id}`);
		return data;
	}
);

export const getLastComments = createAsyncThunk(
	'articles/GET_LAST_COMMENTS',
	async () => {
		const { data } = await axios.get(`/comment/last`);
		return data;
	}
);

export const sendComment = createAsyncThunk(
	'articles/SEND_COMMENT',
	async ({ id: articleId, text }) => {
		const { data } = await axios.post(`/comment`, {
			text,
			articleId,
		});
		return data;
	}
);

export const deleteComment = createAsyncThunk(
	'articles/DELETE_COMMENT',
	async ({ commentId, articleId }) => {
		const { data } = await axios.delete(
			`/comment/${articleId}/delete-comment/${commentId}`
		);
		return data._id;
	}
);

export const updateComment = createAsyncThunk(
	'articles/UPDATE_COMMENT',
	async ({ commentId, text }) => {
		const { data } = await axios.patch(`/comment/`, { commentId, text });
		return data;
	}
);

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

		builder.addCase(getOneArticle.pending, (state) => {
			state.openArticle = {};
			state.isLoading = true;
			state.isError = false;
		});
		builder.addCase(getOneArticle.fulfilled, (state, action) => {
			state.isLoading = false;
			state.openArticle = action.payload;
		});
		builder.addCase(getOneArticle.rejected, (state) => {
			state.openArticle = {};
			state.isLoading = false;
			state.isError = true;
		});

		builder.addCase(deleteArticle.fulfilled, (state, action) => {
			state.articles = state.articles.filter((a) => a._id !== action.payload);
		});

		builder.addCase(getLastComments.fulfilled, (state, action) => {
			state.lastComments = action.payload;
		});

		builder.addCase(sendComment.fulfilled, (state, action) => {
			state.openArticle = action.payload;
		});

		builder.addCase(updateComment.fulfilled, (state, action) => {
			state.openArticle.comments = state.openArticle.comments.map((c) => {
				if (c._id === action.payload._id) {
					return action.payload;
				}
				return c;
			});
		});

		builder.addCase(deleteComment.fulfilled, (state, action) => {
			state.openArticle.comments = state.openArticle.comments.filter(
				(c) => c._id !== action.payload
			);
		});
	},
});

const { reducer, actions } = articleSlice;
export const { SET_TAG, SET_SORT } = actions;
export default reducer;
