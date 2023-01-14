import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './Login.module.scss';

export const Login = () => {
	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Enter an account
			</Typography>
			<TextField
				className={styles.field}
				label="E-Mail"
				error
				helperText="Wrong email"
				fullWidth
			/>
			<TextField className={styles.field} label="Password" fullWidth />
			<Button size="large" variant="contained" fullWidth>
				Log In
			</Button>
		</Paper>
	);
};
