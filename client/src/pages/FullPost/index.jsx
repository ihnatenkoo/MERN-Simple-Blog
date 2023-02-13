import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneArticle } from '../../store/article/article.slice';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Post } from '../../components/Post';
import { PostSkeleton } from '../../components/Post/Skeleton';
import { AddComment } from '../../components/AddComment';
import { CommentsBlock } from '../../components/CommentsBlock/CommentsBlock';

export const FullPost = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.auth.isAuth);
	const article = useSelector((state) => state.articles.openArticle);
	const { isLoading, isError } = useSelector((state) => state.articles);

	useEffect(() => {
		dispatch(getOneArticle(id));
	}, []);

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
				commentsCount={article.comments?.length}
				tags={article.tags}
				isFullPost
			>
				<ReactMarkdown children={article.text} />
			</Post>
			<CommentsBlock
				title="Comments"
				comments={article.comments}
				isLoading={isLoading}
				isSideBar={false}
				isFullPost={true}
			>
				{isAuth && <AddComment />}
			</CommentsBlock>
		</>
	);
};
