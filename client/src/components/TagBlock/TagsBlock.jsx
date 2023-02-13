import React from 'react';
import { useDispatch } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import { SET_TAG } from '../../store/article/article.slice';
import { SideBlock } from '../SideBlock';

export const TagsBlock = ({ items, isLoading = true }) => {
	const dispatch = useDispatch();
	const onTagChangeHandler = (tag) => {
		dispatch(SET_TAG(tag));
	};
	return (
		<SideBlock title="Last Tags">
			<List>
				{(isLoading ? [...Array(5)] : items).map((tag, i) => (
					<span
						key={i}
						style={{ textDecoration: 'none', color: 'black' }}
						onClick={() => onTagChangeHandler(tag)}
					>
						<ListItem key={i} disablePadding>
							<ListItemButton>
								<ListItemIcon style={{ minWidth: 0 }}>
									<TagIcon />
								</ListItemIcon>
								{isLoading ? (
									<Skeleton width={100} />
								) : (
									<ListItemText primary={tag} />
								)}
							</ListItemButton>
						</ListItem>
					</span>
				))}
			</List>
		</SideBlock>
	);
};
