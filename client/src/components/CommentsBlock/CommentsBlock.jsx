import React from 'react';
import dayjs from 'dayjs';
import { SideBlock } from '../SideBlock';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import s from './CommentsBlock.module.scss';

export const CommentsBlock = ({ items = [], children, isLoading = true }) => {
	return (
		<SideBlock title="Comments">
			<List>
				{(isLoading ? [...Array(5)] : items).map((comment, index) => (
					<React.Fragment key={index}>
						<ListItem alignItems="flex-start">
							<ListItemAvatar>
								{isLoading ? (
									<Skeleton variant="circular" width={40} height={40} />
								) : (
									<Avatar
										alt={comment.user.fullName}
										src={
											comment.user.avatarUrl
												? `${process.env.REACT_APP_API_URL}/avatars/${comment.user.avatarUrl}`
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
								<>
									<div className={s.comment}>
										<span className={s.comment__userName}>
											{comment.user.fullName}
										</span>
										<div className={s.comment__time}>
											<span>{dayjs(comment.createdAt).format('HH:mm')}</span>
											<span>{dayjs(comment.createdAt).format('DD-MM-YY')}</span>
										</div>
										<span className={s.comment__text}>{comment.text}</span>
									</div>
								</>
							)}
						</ListItem>
					</React.Fragment>
				))}
			</List>
			{children}
		</SideBlock>
	);
};
