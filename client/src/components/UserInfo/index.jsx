import React from 'react';
import TimeLabel from '../TimeLabel/TimeLabel';
import styles from './UserInfo.module.scss';

export const UserInfo = ({ avatarUrl, fullName, date }) => {
	return (
		<div className={styles.root}>
			<img
				className={styles.avatar}
				src={
					avatarUrl
						? `${process.env.REACT_APP_API_URL}/avatars/${avatarUrl}`
						: '/noavatar.png'
				}
				alt={fullName}
			/>
			<div className={styles.userDetails}>
				<span className={styles.userName}>{fullName}</span>
				<TimeLabel date={date} />
			</div>
		</div>
	);
};
