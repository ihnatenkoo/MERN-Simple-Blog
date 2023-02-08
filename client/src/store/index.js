import { configureStore } from '@reduxjs/toolkit';

import auth from './auth/auth.slice';
import articles from './article/article.slice';
import tags from './tags/tags.slice';
import lastComments from './lastComments/lastComments.slice';

const store = configureStore({
	reducer: { auth, articles, tags, lastComments },
	devTools: process.env.NODE_ENV !== 'production',
});

export default store;
