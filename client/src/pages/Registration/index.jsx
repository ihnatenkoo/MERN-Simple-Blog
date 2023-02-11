import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { onRegister } from '../../store/auth/auth.slice';
import axios from '../../api/';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import styles from './Registration.module.scss';

export const Registration = () => {
	const [avatarUrl, setAvatarUrl] = useState('');
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.auth.isAuth);
	const registerError = useSelector((state) => state.auth.registerError);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onChange',
	});

	if (isAuth) {
		return <Navigate to="/" />;
	}

	const onAvatarPreviewSubmit = async (e) => {
		try {
			const file = e.target.files[0];
			const formData = new FormData();
			formData.append('file', file);
			const { data } = await axios.post('file/upload-preview', formData);
			setAvatarUrl(data.url);
		} catch (error) {
			console.log(error);
		}
	};

	const onRegisterHandler = (data) => {
		const registerData = { ...data, avatarUrl };
		dispatch(onRegister(registerData));
	};

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Create an account
			</Typography>
			<div className={styles.avatar}>
				<img
					src={
						(avatarUrl &&
							`${process.env.REACT_APP_API_URL}/previews/${avatarUrl}`) ||
						'/noavatar.png'
					}
					alt={'avatar'}
				/>
				<TextField
					onChange={onAvatarPreviewSubmit}
					name="avatar"
					type="file"
					className={styles.field}
				/>
			</div>

			<form onSubmit={handleSubmit(onRegisterHandler)}>
				<TextField
					className={styles.field}
					label="Full name"
					fullWidth
					error={!!errors.fullName?.message}
					helperText={errors.fullName?.message}
					{...register('fullName', {
						required: 'Please enter a name',
						minLength: {
							value: 3,
							message: 'Name must have more than 2 characters',
						},
					})}
				/>
				<TextField
					className={styles.field}
					label="E-Mail"
					fullWidth
					error={!!errors.email?.message}
					helperText={errors.email?.message}
					{...register('email', {
						required: 'Please enter an email',
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: 'Invalid email address',
						},
					})}
				/>
				<TextField
					className={styles.field}
					label="Password"
					fullWidth
					error={!!errors.password?.message}
					helperText={errors.password?.message}
					{...register('password', {
						required: 'Please enter a password',
						minLength: {
							value: 5,
							message: 'Password must have more than 4 characters',
						},
					})}
				/>
				{registerError.message && (
					<Alert severity="error" className={styles.error}>
						{registerError.message}
					</Alert>
				)}
				<Button
					disabled={!isValid}
					type="submit"
					size="large"
					variant="contained"
					fullWidth
				>
					Register
				</Button>
			</form>
		</Paper>
	);
};
