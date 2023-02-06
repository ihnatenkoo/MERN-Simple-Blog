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
	isLoading = true,
	isEditable,
}) => {
	return (
		<SideBlock title={title}>
			<List>
				{(isLoading ? [...Array(5)] : comments).map((commentData, index) => (
					<React.Fragment key={index}>
						<ListItem alignItems="flex-start">
							<ListItemAvatar>
								{isLoading ? (
									<Skeleton variant="circular" width={40} height={40} />
								) : (
									<Avatar
										alt={commentData.user.fullName}
										src={
											commentData.user.avatarUrl
												? `${process.env.REACT_APP_API_URL}/avatars/${commentData.user.avatarUrl}`
												: '/noavatar.png'
										}
									/>
								)}
							</ListItemAvatar>
							{isLoading ? (
								<div style={{ display: 'flex', flexDirection: 'column' }}>
									<Skeleton variant="text" height={25} width={120} />
									<Skeleton variant="text" height={18} width={230} />
								</div>
							) : (
								<Comment data={commentData} isEditable={isEditable}></Comment>
							)}
						</ListItem>
					</React.Fragment>
				))}
			</List>
			{children}
		</SideBlock>
	);
};
