import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { sendComment } from '../../store/article/article.slice';
import styles from './AddComment.module.scss';

export const AddComment = () => {
	const { id } = useParams(useState);
	const [text, setText] = useState('');
	const dispatch = useDispatch();
	const avatarUrl = useSelector((state) => state.auth.user?.avatarUrl);

	const onTextChange = (e) => {
		setText(e.target.value);
	};

	const onSendCommentHandler = (text) => {
		dispatch(sendComment({ id, text }));
		setText('');
	};

	return (
		<>
			<div className={styles.root}>
				<Avatar
					classes={{ root: styles.avatar }}
					src={
						avatarUrl && `${process.env.REACT_APP_API_URL}/avatars/${avatarUrl}`
					}
				/>
				<div className={styles.form}>
					<TextField
						label="Write a comment"
						onChange={onTextChange}
						value={text}
						variant="outlined"
						maxRows={10}
						multiline
						fullWidth
					/>
					<Button
						onClick={() => onSendCommentHandler(text)}
						variant="contained"
					>
						Send
					</Button>
				</div>
			</div>
		</>
	);
};
