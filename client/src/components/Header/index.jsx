import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import styles from './Header.module.scss';
import { logout } from '../../store/auth/auth.slice';

export const Header = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.auth.isAuth);

	const onLogoutHandler = () => {
		if (window.confirm('Are you sure you want to logout')) {
			dispatch(logout());
		}
	};

	return (
		<div className={styles.root}>
			<Container maxWidth="lg">
				<div className={styles.inner}>
					<Link className={styles.logo} to="/">
						<div>MERN BLOG</div>
					</Link>
					<div className={styles.buttons}>
						{isAuth ? (
							<>
								<Link to="/posts/create">
									<Button variant="contained">Write article</Button>
								</Link>
								<Button
									onClick={onLogoutHandler}
									variant="contained"
									color="error"
								>
									Logout
								</Button>
							</>
						) : (
							<>
								<Link to="/login">
									<Button variant="outlined">Log In</Button>
								</Link>
								<Link to="/register">
									<Button variant="contained">Create account</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};
