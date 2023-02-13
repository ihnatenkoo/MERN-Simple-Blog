import React from 'react';
import styles from './SideBlock.module.scss';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export const SideBlock = ({ children, title, isOpen, isFullPost, handler }) => {
	return (
		<Paper classes={{ root: styles.root }}>
			<Typography
				variant="h6"
				classes={{ root: styles.title }}
				onClick={handler}
			>
				{title}
				{isFullPost ? null : isOpen ? (
					<span className="material-icons-outlined">expand_less</span>
				) : (
					<span className="material-icons-outlined">expand_more</span>
				)}
			</Typography>
			{children}
		</Paper>
	);
};
