export interface Post {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    author: {
        uid: number;
        username: string;
    };
    likes_count: number;
    likedByCurrentUser?: boolean;
    comments?: Comment[] | undefined;
    comment_count: number;
}