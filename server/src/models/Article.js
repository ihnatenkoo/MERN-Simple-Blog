import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},

		title: {
			type: String,
			required: true,
		},

		text: {
			type: String,
		},

		viewCount: {
			type: Number,
			default: 0,
		},

		tags: {
			type: Array,
			default: [],
		},

		imageUrl: String,
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default mongoose.model('Article', ArticleSchema);
