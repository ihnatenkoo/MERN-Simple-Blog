import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import { PostSkeleton } from '../../components/Post/Skeleton';
import { Post } from '../../components/Post';
import { TagsBlock } from '../../components/TagBlock/TagsBlock';
import { CommentsBlock } from '../../components/CommentsBlock/CommentsBlock';
import { getArticles } from '../../store/article/article.slice';
import { getLastTags } from '../../store/tags/tags.slice';
import { getLastComments } from '../../store/lastComments/lastComments.slice';

import PostNavBar from '../../components/PostNavBar/PostNavBar';

export const Home = () => {
	const dispatch = useDispatch();
	const articles = useSelector((state) => state.articles.articles);
	const isArticleLoading = useSelector((state) => state.articles.isLoading);
	const tags = useSelector((state) => state.tags.tags);
	const isTagsLoading = useSelector((state) => state.tags.isLoading);
	const lastComments = useSelector((state) => state.lastComments.lastComments);
	const lastCommentsLoading = useSelector(
		(state) => state.lastComments.isLoading
	);
	const currentUser = useSelector((state) => state.auth.user?._id);
	const currentTag = useSelector((state) => state.articles.currentTag);
	const sort = useSelector((state) => state.articles.sort);

	useEffect(() => {
		dispatch(getLastTags());
		dispatch(getLastComments());
	}, []);

	useEffect(() => {
		dispatch(getArticles({ sort, currentTag }));
	}, [sort, currentTag]);

	return (
		<>
			<PostNavBar />
			<Grid
				container
				spacing={{
					xs: 1,
					md: 4,
				}}
				sx={{
					flexDirection: { xs: 'column-reverse', md: 'row' },
				}}
			>
				<Grid xs={12} md={8} item>
					{isArticleLoading
						? [...Array(5)].map((_, i) => <PostSkeleton key={i} />)
						: articles.map((article) => (
								<Post
									key={article._id}
									id={article._id}
									title={article.title}
									imageUrl={article.imageUrl}
									user={article.user}
									createdAt={article.createdAt}
									viewsCount={article.viewCount}
									commentsCount={article.comments.length}
									tags={article.tags}
									isEditable={article.user._id === currentUser}
								/>
						  ))}
				</Grid>
				<Grid xs={12} md={4} item>
					<TagsBlock items={tags} isLoading={isTagsLoading} />
					<CommentsBlock
						title="Last Comments"
						comments={lastComments}
						isLoading={lastCommentsLoading}
						isSideBar={true}
					/>
				</Grid>
			</Grid>
		</>
	);
};
