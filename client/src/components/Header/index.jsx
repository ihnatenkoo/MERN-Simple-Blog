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
	const user = useSelector((state) => state.auth.user);
	const { fullName, avatarUrl } = user ?? {};

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
						MERN BLOG
					</Link>
					<div className={styles.buttons}>
						{isAuth ? (
							<>
								<div className={styles.user}>
									<img
										className={styles.user__avatar}
										src={
											`${process.env.REACT_APP_API_URL}/${avatarUrl}` ||
											'noavatar.png'
										}
										alt="user"
									></img>
									<span>{fullName}</span>
								</div>
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
