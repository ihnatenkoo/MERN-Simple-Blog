import React from 'react';
import { SideBlock } from '../SideBlock';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import Comment from '../Comment/Comment';

export const CommentsBlock = ({
	title,
	comments = [],
	children,
	isLoading,
	isSideBar,
}) => {
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
		<SideBlock title={title}>
			<List>
				{comments.map((commentData) => (
					<ListItem alignItems="flex-start" key={commentData._id}>
						<ListItemAvatar>
							<Avatar
								alt={commentData.user.fullName}
								src={
									commentData.user.avatarUrl
										? `${process.env.REACT_APP_API_URL}/avatars/${commentData.user.avatarUrl}`
										: '/noavatar.png'
								}
							/>
						</ListItemAvatar>

						<Comment data={commentData} isSideBar={isSideBar}></Comment>
					</ListItem>
				))}
			</List>
			{children}
		</SideBlock>
	);
};
