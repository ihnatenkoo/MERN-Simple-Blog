import { configureStore } from '@reduxjs/toolkit';

import articles from '../store/article/article.slice';

const store = configureStore({
	reducer: { articles },
	devTools: process.env.NODE_ENV !== 'production',
});

export default store;
