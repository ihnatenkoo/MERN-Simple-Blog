export const userDto = (user) => {
	return {
		_id: user._id,
		fullName: user.fullName,
		email: user.email,
		avatarUrl: user.avatarUrl,
	};
};
