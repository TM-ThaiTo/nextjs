export type USlug = {
    slug: string;
}

export type UProfileType = {
    _id: string;
    slug: string;
    fullName: string;
    avatar: string;
    follower: number;
    following: number;
    posts: number;
    bio: string;
}

export type UResponseProfile = {
    code: number;
    message: string;
    data: {
        isMe: boolean;
        user: UProfileType;
    };
}

export type UPostItem = {
    id: string;
    slug: string;
    listUrl: {
        thumbnail?: string;
        url: string;
        width: string;
        height: string;
    }[];
    type: number;
    likes: number;
    comments: number;
};

export type UPost = {
    data: UPostItem;
}

export type UPosts = {
    data: UPostItem[];
};

export type IFollow = {
    id: string;
    idFollow: string;
}

export type ILikePost = {
    idUser: string;
    idPost: string;
}