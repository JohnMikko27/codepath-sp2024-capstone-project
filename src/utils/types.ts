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
    upvotes: number,
    imgUrl: string
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

export interface YearlyStats {
    AST: number,
    BLK: number,
    DREB: number,
    FG3A: number,
    FG3M: number,
    FG3_PCT: number,
    FGA: number,
    FGM: number,
    FG_PCT: number,
    FTA: number,
    FTM: number,
    FT_PCT: number,
    GP: number,
    MIN: number,
    OREB: number,
    PF: number,
    PTS: number,
    REB: number,
    STL: number,
    TOV: number,
    TS_PCT: number,
    player_id: string,
    season_id: string,
    year: string

}
