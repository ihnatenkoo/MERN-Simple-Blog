import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_TAG, SET_SORT } from '../../store/article/article.slice';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';

const PostNavBar = () => {
	const [activeTab, setActiveTab] = useState('1');
	const dispatch = useDispatch();
	const currentTag = useSelector((state) => state.articles.currentTag);

	const onChangeTabSort = (e, value) => {
		dispatch(SET_SORT(e.target.name));
		setActiveTab(value);
	};

	const onDeleteActiveTag = () => {
		dispatch(SET_TAG(''));
	};

	return (
		<>
			<Tabs
				style={{ marginBottom: 15 }}
				value={activeTab}
				aria-label="basic tabs example"
			>
				<Tab
					label="New"
					name="new"
					value="1"
					onClick={(e) => onChangeTabSort(e, '1')}
				/>
				<Tab
					label="Popular"
					name="popular"
					value="2"
					onClick={(e) => onChangeTabSort(e, '2')}
				/>
			</Tabs>
			{currentTag && (
				<Chip
					label={`# ${currentTag}`}
					variant="outlined"
					onDelete={onDeleteActiveTag}
					sx={{ fontWeight: 'bold', margin: '0  0 20px 10px' }}
				/>
			)}
		</>
	);
};

export default PostNavBar;
