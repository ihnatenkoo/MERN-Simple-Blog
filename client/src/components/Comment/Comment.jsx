import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {
	deleteComment,
	updateComment,
} from '../../store/article/article.slice';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import s from './Comment.module.scss';
import clsx from 'clsx';

const Comment = ({ data, isSideBar }) => {
	const [text, setText] = useState(data.text ?? '');
	const [isEdit, setIsEdit] = useState(false);
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.auth.user?._id);
	const articleId = useSelector((state) => state.articles.openArticle._id);

	const onToggleEditHandler = () => {
		setIsEdit((prev) => !prev);
	};

	const onEditCommentHandler = (e) => {
		setText(e.target.value);
	};

	const omSendUpdatedComment = (e) => {
		e.preventDefault();
		dispatch(updateComment({ commentId: data._id, text }));
		setIsEdit(false);
	};

	const onDeleteCommentHandler = (commentId, articleId) => {
		dispatch(deleteComment({ commentId, articleId }));
	};

	const textLengthHandler = (text) => {
		if (isSideBar && text.length > 100) return `${text.slice(0, 100)}...`;
		return text;
	};

	return (
		<div className={s.comment}>
			<div className={s.comment__user}>
				<ListItemAvatar
					sx={{
						marginTop: 0,
					}}
				>
					<Avatar
						alt={data.user?.fullName}
						src={
							data.user?.avatarUrl
								? `${process.env.REACT_APP_API_URL}/avatars/${data.user.avatarUrl}`
								: '/noavatar.png'
						}
					/>
				</ListItemAvatar>

				<div className={s.comment__user_info}>
					{isSideBar ? (
						<Link to={`posts/${data.articleId}`}>
							{data.user?.fullName ?? 'User was deleted'}
							<span className={clsx('material-icons-outlined', s.icon)}>
								read_more
							</span>
						</Link>
					) : (
						<span>{data.user?.fullName ?? 'User was deleted'}</span>
					)}
					<div className={s.comment__time}>
						<span>{dayjs(data.updatedAt).format('HH:mm')}</span>
						<span>{dayjs(data.updatedAt).format('DD-MMM-YY')}</span>
					</div>
				</div>

				{!isSideBar && !isEdit && userId === data.user?._id && (
					<div className={s.comment__nav}>
						<Button
							className={s.comment__nav_edit}
							variant="contained"
							onClick={onToggleEditHandler}
						>
							edit
						</Button>
						<Button
							className={s.comment__nav_delete}
							variant="contained"
							onClick={() => onDeleteCommentHandler(data._id, articleId)}
						>
							delete
						</Button>
					</div>
				)}
			</div>

			{isEdit ? (
				<form onSubmit={omSendUpdatedComment} className={s.comment__form}>
					<TextField
						label="Edit a comment"
						onChange={onEditCommentHandler}
						value={text}
						variant="outlined"
						maxRows={10}
						multiline
						fullWidth
					/>
					<Button className={s.edit} type="submit" variant="contained">
						Edit
					</Button>
					<Button
						onClick={onToggleEditHandler}
						className={s.cancel}
						variant="contained"
					>
						Cancel
					</Button>
				</form>
			) : (
				<span className={s.comment__text}>{textLengthHandler(data.text)}</span>
			)}
		</div>
	);
};

export default Comment;
