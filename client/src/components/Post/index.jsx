import React from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { deleteArticle } from '../../store/article/article.slice';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { Link } from 'react-router-dom';

export const Post = ({
	id,
	title,
	createdAt,
	imageUrl,
	user,
	viewsCount,
	commentsCount,
	tags,
	children,
	isFullPost,
	isEditable,
}) => {
	const dispatch = useDispatch();

	const onClickRemove = () => {
		dispatch(deleteArticle(id));
	};

	return (
		<div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
			{isEditable && (
				<div className={styles.editButtons}>
					<Link to={`/posts/${id}/edit`}>
						<IconButton color="primary">
							<EditIcon />
						</IconButton>
					</Link>
					<IconButton onClick={onClickRemove} color="secondary">
						<DeleteIcon />
					</IconButton>
				</div>
			)}
			{imageUrl && (
				<img
					className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
					src={`${process.env.REACT_APP_API_URL}/posts/${imageUrl}`}
					alt={title}
				/>
			)}
			<div className={styles.wrapper}>
				<UserInfo
					{...user}
					additionalText={dayjs(createdAt).format('DD-MM-YYYY')}
				/>
				<div className={styles.indention}>
					<h2
						className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
					>
						{isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
					</h2>
					<ul className={styles.tags}>
						{tags.map((tag) => (
							<li key={tag}>
								<Link to={`/tag/${tag}`}>#{tag}</Link>
							</li>
						))}
					</ul>
					{children && <div className={styles.content}>{children}</div>}
					<ul className={styles.postDetails}>
						<li>
							<EyeIcon />
							<span>{viewsCount}</span>
						</li>
						<li>
							<CommentIcon />
							<span>{commentsCount}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
