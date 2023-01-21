import React from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { onRegister } from '../../store/auth/auth.slice';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Registration.module.scss';

export const Registration = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.auth.isAuth);

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

	const onRegisterHandler = (registerData) => {
		const { fullName, password, email } = registerData;
		const formData = new FormData();
		formData.append('avatar', registerData.file[0]);
		formData.append('fullName', fullName);
		formData.append('password', password);
		formData.append('email', email);
		dispatch(onRegister(formData));
	};

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Create an account
			</Typography>
			<form onSubmit={handleSubmit(onRegisterHandler)}>
				<div className={styles.avatar}>
					<Avatar sx={{ width: 100, height: 100 }} />
				</div>
				<TextField
					name="avatar"
					type={'file'}
					className={styles.field}
					{...register('file')}
				/>
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
