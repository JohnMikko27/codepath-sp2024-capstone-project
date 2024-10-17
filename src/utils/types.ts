export interface UserType {
    id: number,
    username: string, 
    password: string,
    createdAt: string,
    posts: PostType[],
    comments: Comment[]
}

export interface PostType {
    id: number,
    title: string,
    content: string
    createdAt: string,
    author: UserType,
    authorId: number,
    comments: CommentType[]
    usersLiked: number[],
    upvotes: number
}

export interface CommentType {
    id: number,
    content: string,
    createdAt: string,
    author: UserType,
    authorId: number,
    post: PostType,
    postId: number
}
