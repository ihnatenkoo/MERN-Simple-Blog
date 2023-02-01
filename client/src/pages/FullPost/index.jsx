import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from '../../api';
import { Post } from '../../components/Post';
import { PostSkeleton } from '../../components/Post/Skeleton';
import { Index } from '../../components/AddComment';
import { CommentsBlock } from '../../components/CommentsBlock';

export const FullPost = () => {
	const { id } = useParams();
	const [article, setArticle] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		getArticle();
	}, []);

	const getArticle = async () => {
		try {
			const { data } = await axios.get(`/articles/${id}`);
			setArticle(data);
		} catch (error) {
			setIsError(true);
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return <PostSkeleton />;
	}

	if (isError) {
		return <h2>Loading error...</h2>;
	}

	return (
		<>
			<Post
				id={article._id}
				title={article.title}
				imageUrl={article.imageUrl}
				user={article.user}
				createdAt={article.createdAt}
				viewsCount={article.viewCount}
				commentsCount={3}
				tags={article.tags}
				isFullPost
			>
				<ReactMarkdown children={article.text} />
			</Post>
			<CommentsBlock
				items={[
					{
						user: {
							fullName: 'Вася Пупкин',
							avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
						},
						text: 'Это тестовый комментарий 555555',
					},
					{
						user: {
							fullName: 'Иван Иванов',
							avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
						},
						text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
					},
				]}
				isLoading={false}
			>
				<Index />
			</CommentsBlock>
		</>
	);
};
