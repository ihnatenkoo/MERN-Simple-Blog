import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { sendComment } from '../../store/article/article.slice';
import styles from './AddComment.module.scss';

export const AddComment = () => {
	const { id } = useParams(useState);
	const dispatch = useDispatch();
	const avatarUrl = useSelector((state) => state.auth.user?.avatarUrl);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onChange',
	});

	const onSendCommentHandler = ({ text }) => {
		dispatch(sendComment({ id, text }));
		setValue('text', '');
	};

	return (
		<div className={styles.root}>
			<Avatar
				classes={{ root: styles.avatar }}
				src={
					avatarUrl && `${process.env.REACT_APP_API_URL}/avatars/${avatarUrl}`
				}
			/>
			<form
				className={styles.form}
				onSubmit={handleSubmit(onSendCommentHandler)}
			>
				<TextField
					label="Write a comment"
					variant="outlined"
					maxRows={10}
					multiline
					fullWidth
					error={!!errors.text?.message}
					helperText={errors.text?.message}
					{...register('text', {
						required: true,
						maxLength: {
							value: 2000,
							message: 'Max comment length is 2000 characters',
						},
					})}
				/>
				<Button type="submit" disabled={!isValid} variant="contained">
					Send
				</Button>
			</form>
		</div>
	);
};
