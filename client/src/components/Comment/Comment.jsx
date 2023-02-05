import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {
	deleteComment,
	updateComment,
} from '../../store/article/article.slice';
import s from './Comment.module.scss';

const Comment = ({ data }) => {
	const [text, setText] = useState(data.text);
	const [isEdit, setIsEdit] = useState(false);
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.auth.user._id);
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

	return (
		<div className={s.comment}>
			<div className={s.comment__inner}>
				<span className={s.comment__userName}>{data.user.fullName}</span>
				<div className={s.comment__time}>
					<span>{dayjs(data.updatedAt).format('HH:mm')}</span>
					<span>{dayjs(data.updatedAt).format('DD-MM-YY')}</span>
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
						<Button type="submit" variant="contained">
							Edit
						</Button>
					</form>
				) : (
					<span className={s.comment__text}>{data.text}</span>
				)}
			</div>
			{userId === data.user._id && (
				<div className={s.comment__nav}>
					<span onClick={onToggleEditHandler} className={s.comment__nav_edit}>
						edit
					</span>
					<span
						onClick={() => onDeleteCommentHandler(data._id, articleId)}
						className={s.comment__nav_delete}
					>
						delete
					</span>
				</div>
			)}
		</div>
	);
};

export default Comment;
