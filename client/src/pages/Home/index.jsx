import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { PostSkeleton } from '../../components/Post/Skeleton';

import { Post } from '../../components/Post';
import { TagsBlock } from '../../components/TagsBlock';
import { CommentsBlock } from '../../components/CommentsBlock';
import { getAllArticles } from '../../store/article/article.slice';
import { getLastTags } from '../../store/tags/tags.slice';

export const Home = () => {
	const dispatch = useDispatch();

	const articles = useSelector((state) => state.articles.articles);
	const isArticleLoading = useSelector((state) => state.articles.isLoading);
	const tags = useSelector((state) => state.tags.tags);
	const isTagsLoading = useSelector((state) => state.tags.isLoading);
	const currentUser = useSelector((state) => state.auth.user?._id);

	useEffect(() => {
		dispatch(getAllArticles());
		dispatch(getLastTags());
	}, [dispatch]);

	return (
		<>
			<Tabs
				style={{ marginBottom: 15 }}
				value={0}
				aria-label="basic tabs example"
			>
				<Tab label="New" />
				<Tab label="Popular" />
			</Tabs>
			<Grid container spacing={4}>
				<Grid xs={8} item>
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
									commentsCount={3}
									tags={article.tags}
									isEditable={article.user._id === currentUser}
								/>
						  ))}
				</Grid>
				<Grid xs={4} item>
					<TagsBlock items={tags} isLoading={isTagsLoading} />
					<CommentsBlock
						items={[
							{
								user: {
									fullName: 'Mike Adams',
									avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
								},
								text: 'You should set the prop to align the avatar at the top',
							},
							{
								user: {
									fullName: 'Alex Smith',
									avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
								},
								text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
							},
						]}
						isLoading={false}
					/>
				</Grid>
			</Grid>
		</>
	);
};
