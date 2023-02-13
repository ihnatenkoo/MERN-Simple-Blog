import React, { useState } from 'react';
import { SideBlock } from '../SideBlock';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import Comment from '../Comment/Comment';
import s from './CommentsBlock.module.scss';
import clsx from 'clsx';

export const CommentsBlock = ({
	title,
	comments = [],
	children,
	isLoading,
	isSideBar,
	isFullPost,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const openBlockHandler = () => {
		setIsOpen((prevState) => !prevState);
	};

	if (isLoading) {
		return (
			<SideBlock title={title}>
				<List>
					{[...Array(3)].map((_, index) => (
						<ListItem alignItems="flex-start" key={index}>
							<ListItemAvatar>
								<Skeleton variant="circular" width={40} height={40} />
							</ListItemAvatar>
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<Skeleton variant="text" height={25} width={120} />
								<Skeleton variant="text" height={18} width={230} />
							</div>
						</ListItem>
					))}
				</List>
				{children}
			</SideBlock>
		);
	}

	return (
		<SideBlock
			title={title}
			isOpen={isOpen}
			handler={openBlockHandler}
			isFullPost={isFullPost}
		>
			<List
				className={clsx(s.comment, {
					[s.open]: isOpen,
					[s.fullPost]: isFullPost,
				})}
			>
				{comments.map((commentData) => (
					<ListItem alignItems="flex-start" key={commentData._id}>
						<Comment data={commentData} isSideBar={isSideBar} />
					</ListItem>
				))}
			</List>
			{children}
		</SideBlock>
	);
};
