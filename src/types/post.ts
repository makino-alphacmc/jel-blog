export type Post = {
	id: string;
	title: string;
	content: string;
	topImage: string | nul;
	createdAt: Date;
	author: {
		name: string;
	};
};
export type PostCardProps = { post: Post };
