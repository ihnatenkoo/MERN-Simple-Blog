import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { getAllArticles } from '../store/article/article.slice';

export const Home = () => {
	const dispatch = useDispatch();
	const articles = useSelector((state) => state.articles.articles);
	const isLoading = useSelector((state) => state.articles.isLoading);
	console.log(isLoading);

	useEffect(() => {
		dispatch(getAllArticles());
	}, [dispatch]);

	return (
		<>
			<Tabs
				style={{ marginBottom: 15 }}
				value={0}
				aria-label="basic tabs example"
			>
				<Tab label="Новые" />
				<Tab label="Популярные" />
			</Tabs>
			<Grid container spacing={4}>
				<Grid xs={8} item>
					{articles.map((article) => (
						<Post
							key={article._id}
							title={article.title}
							imageUrl={article.imageUrl}
							user={{
								avatarUrl:
									'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
								fullName: article.user.fullName,
							}}
							createdAt={article.createdAt}
							viewsCount={article.viewCount}
							commentsCount={3}
							tags={article.tags}
							isLoading={isLoading}
							isEditable
						/>
					))}
				</Grid>
				<Grid xs={4} item>
					<TagsBlock
						items={['react', 'typescript', 'заметки']}
						isLoading={false}
					/>
					<CommentsBlock
						items={[
							{
								user: {
									fullName: 'Mike Adams',
									avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
								},
								text: 'Это тестовый комментарий',
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
