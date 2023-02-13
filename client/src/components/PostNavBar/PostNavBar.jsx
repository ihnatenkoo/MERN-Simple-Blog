import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_TAG, SET_SORT } from '../../store/article/article.slice';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import s from './PostNavBar.module.scss';
import clsx from 'clsx';

const PostNavBar = () => {
	const [activeSlide, setActiveSlide] = useState('1');
	const dispatch = useDispatch();
	const currentTag = useSelector((state) => state.articles.currentTag);

	const onChangeTabSort = (e, value) => {
		dispatch(SET_SORT(e.target.name));
		setActiveSlide(value);
	};

	const onDeleteActiveTag = () => {
		dispatch(SET_TAG(''));
	};

	return (
		<>
			<Tabs
				style={{ marginBottom: 15 }}
				value={activeSlide}
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
				<div className={s.tag}>
					<span className={s.tag__name}>#{currentTag}</span>
					<span
						className={clsx('material-icons-outlined', s.tag__delete)}
						onClick={onDeleteActiveTag}
					>
						clear
					</span>
				</div>
			)}
		</>
	);
};

export default PostNavBar;
