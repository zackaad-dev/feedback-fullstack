export interface Comment {
    id: string;
    post: string;
    content: string;
    author: {
        uid: number;
        username: string;
    };
    likes_count: number;
    createdAt: string;
    updatedAt: string;
    _count: number;
    likedByCurrentUser?: boolean;
}