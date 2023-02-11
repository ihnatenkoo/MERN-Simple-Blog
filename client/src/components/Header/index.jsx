import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { logout } from '../../store/auth/auth.slice';
import styles from './Header.module.scss';
import clsx from 'clsx';

export const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.auth.isAuth);
	const user = useSelector((state) => state.auth.user);
	const { fullName, avatarUrl } = user ?? {};

	const onMenuClickHandler = () => {
		setIsMenuOpen((prevState) => !prevState);
	};

	const onLogoutHandler = () => {
		if (window.confirm('Are you sure you want to logout')) {
			dispatch(logout());
		}
	};

	return (
		<header className={styles.header}>
			<Container maxWidth="lg">
				<div className={styles.header__inner}>
					<Link className={styles.header__logo} to="/">
						Ihnatenko BLOG
					</Link>

					<nav className={styles.nav} onClick={isAuth && onMenuClickHandler}>
						{!localStorage.getItem('token') && (
							<>
								<Link to="/login">
									<Button variant="outlined">Log In</Button>
								</Link>
								<Link to="/register">
									<Button variant="contained">Create account</Button>
								</Link>
							</>
						)}

						{isAuth && (
							<>
								<div className={styles.user}>
									<span>{fullName}</span>
									<img
										className={styles.user__avatar}
										src={
											avatarUrl
												? `${process.env.REACT_APP_API_URL}/avatars/${avatarUrl}`
												: 'noavatar.png'
										}
										alt="user"
									/>
								</div>
								<div
									className={clsx(styles.nav__menu, {
										[styles.open]: isMenuOpen,
									})}
								>
									<Link to="/post/create">
										<Button variant="contained">Write article</Button>
									</Link>
									<Button
										onClick={onLogoutHandler}
										variant="contained"
										color="error"
									>
										Logout
									</Button>
								</div>
							</>
						)}
					</nav>
				</div>
			</Container>
		</header>
	);
};
