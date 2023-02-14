import React, { useState } from 'react';
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
import s from './TagsBlock.module.scss';
import clsx from 'clsx';

export const TagsBlock = ({ items, isLoading = true }) => {
	const [isOpen, setIsOpen] = useState(false);

	const dispatch = useDispatch();

	const openBlockHandler = () => {
		setIsOpen((prevState) => !prevState);
	};

	const onTagChangeHandler = (tag) => {
		dispatch(SET_TAG(tag));
		setIsOpen(false);
	};

	return (
		<SideBlock title="Last Tags" handler={openBlockHandler} isOpen={isOpen}>
			<List className={clsx(s.tags, { [s.open]: isOpen })}>
				{isLoading &&
					[...Array(5)].map((_, i) => {
						return (
							<ListItem key={i} disablePadding>
								<ListItemButton>
									<ListItemIcon style={{ minWidth: 0 }}>
										<TagIcon />
									</ListItemIcon>
									<Skeleton width={100} key={i} />
								</ListItemButton>
							</ListItem>
						);
					})}

				{items.map((tag, i) => (
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

								<ListItemText primary={tag} />
							</ListItemButton>
						</ListItem>
					</span>
				))}
			</List>
		</SideBlock>
	);
};
