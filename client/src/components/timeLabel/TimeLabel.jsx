import React from 'react';
import dayjs from 'dayjs';
import s from './TimeLabel.module.scss';

const TimeLabel = ({ date }) => {
	return (
		<div className={s.time}>
			<span>{dayjs(date).format('HH:mm')}</span>
			<span>{dayjs(date).format('DD-MMM-YY')}</span>
		</div>
	);
};

export default TimeLabel;
