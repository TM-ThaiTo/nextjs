export type ResponseGetComment = {
    code: number;
    message: string;
    count?: number;
    data: any;
}
export type CommentType = {
    _id: string,
    idPost: string,
    idUser: string,
    content: string,
    reply: number,
    like: number,
    createdAt: any,
    user: {
        _id: string;
        slug: string;
        fullName: string;
        birthDay: Date;
        address: string;
        bio: string | null;
        follower: number;
        following: number;
        posts: number;
        avatar: string;
    };
}
export type AddCommentType = {
    idPost: string;
    idUser: string;
    idParent: string;
    content: string;
}