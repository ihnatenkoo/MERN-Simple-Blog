import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { PostSkeleton } from '../../components/Post/Skeleton';
import { Post } from '../../components/Post';
import { TagsBlock } from '../../components/TagsBlock';
import { CommentsBlock } from '../../components/CommentsBlock/CommentsBlock';
import {
	getArticles,
	SET_TAG,
	SET_SORT,
} from '../../store/article/article.slice';
import { getLastTags } from '../../store/tags/tags.slice';
import { getLastComments } from '../../store/lastComments/lastComments.slice';
import clsx from 'clsx';
import s from './Home.module.scss';

export const Home = () => {
	const [activeSlide, setActiveSlide] = useState('1');

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

	const onChangeTabSort = (e, value) => {
		dispatch(SET_SORT(e.target.name));
		setActiveSlide(value);
	};

	const onDeleteActiveTag = () => {
		dispatch(SET_TAG(''));
	};

	return (
		<>
			<Tabs
				style={{ marginBottom: 15 }}
				value={activeSlide}
				aria-label="basic tabs example"
			>
				<Tab
					label="New"
					name="new"
					value="1"
					onClick={(e) => onChangeTabSort(e, '1')}
				/>
				<Tab
					label="Popular"
					name="popular"
					value="2"
					onClick={(e) => onChangeTabSort(e, '2')}
				/>
				{currentTag && (
					<div className={s.tag}>
						<span className={s.tag__name}>#{currentTag}</span>
						<span
							className={clsx('material-icons-outlined', s.tag__delete)}
							onClick={onDeleteActiveTag}
						>
							clear
						</span>
					</div>
				)}
			</Tabs>
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
