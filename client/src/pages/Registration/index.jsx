import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';

export const Registration = () => {
	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Create an account
			</Typography>
			<div className={styles.avatar}>
				<Avatar sx={{ width: 100, height: 100 }} />
			</div>
			<TextField className={styles.field} label="Full name" fullWidth />
			<TextField className={styles.field} label="E-Mail" fullWidth />
			<TextField className={styles.field} label="Password" fullWidth />
			<Button size="large" variant="contained" fullWidth>
				Register
			</Button>
		</Paper>
	);
};
