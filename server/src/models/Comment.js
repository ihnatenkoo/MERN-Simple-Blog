import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		articleId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Article',
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default mongoose.model('Comment', CommentSchema);
