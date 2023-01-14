import { configureStore } from '@reduxjs/toolkit';

import articles from '../store/article/article.slice';
import tags from '../store/tags/tags.slice';

const store = configureStore({
	reducer: { articles, tags },
	devTools: process.env.NODE_ENV !== 'production',
});

export default store;
