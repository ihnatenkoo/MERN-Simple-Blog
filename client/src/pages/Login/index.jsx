import React from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from '../../store/auth/auth.slice';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import styles from './Login.module.scss';

export const Login = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.auth.isAuth);
	const authError = useSelector((state) => state.auth.authError);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onChange',
	});

	const onLoginHandler = (loginData) => {
		dispatch(onLogin(loginData));
	};

	if (isAuth) {
		return <Navigate to="/" />;
	}

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Enter an account
			</Typography>
			<form onSubmit={handleSubmit(onLoginHandler)}>
				<TextField
					className={styles.field}
					label="E-Mail"
					error={!!errors.email?.message}
					helperText={errors.email?.message}
					{...register('email', {
						required: 'Please enter an email',
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: 'Invalid email address',
						},
					})}
					fullWidth
				/>
				<TextField
					className={styles.field}
					label="Password"
					helperText={errors.password?.message}
					error={!!errors.password?.message}
					{...register('password', {
						required: 'Please enter a password',
						minLength: {
							value: 5,
							message: 'Password must have more than 4 characters',
						},
					})}
					fullWidth
				/>
				{authError.message && (
					<Alert severity="error" className={styles.error}>
						{authError.message}
					</Alert>
				)}
				<Button
					disabled={!isValid}
					type="submit"
					size="large"
					variant="contained"
					fullWidth
				>
					Sign In
				</Button>
			</form>
		</Paper>
	);
};
