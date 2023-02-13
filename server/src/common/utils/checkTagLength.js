export const checkTagsLength = (tags) => {
	return tags.split(',').map((t) => {
		return t.length > 25
			? t.slice(0, 25).toLowerCase().trim()
			: t.toLowerCase().trim();
	});
};
