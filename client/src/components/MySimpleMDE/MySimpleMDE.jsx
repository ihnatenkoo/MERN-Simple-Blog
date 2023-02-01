import React, { useMemo } from 'react';
import SimpleMDE from 'react-simplemde-editor';

const MySimpleMDE = (props) => {
	const options = useMemo(
		() => ({
			spellChecker: false,
			maxHeight: '400px',
			autofocus: true,
			placeholder: 'Enter a text...',
			status: false,
			autosave: {
				enabled: true,
				delay: 1000,
			},
		}),
		[]
	);

	return <SimpleMDE options={options} {...props} />;
};

export default MySimpleMDE;
