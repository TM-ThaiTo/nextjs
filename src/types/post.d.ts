export type MediaFile = {
    file: IVideoFile | IImageFile;
    type: 'video' | 'image';
}
export type IVideoFile = {
    url: string,
    thumbnails: string[],
    duration: number,
    timeStart: number,
    timeEnd: number,
    size: number,
    soundOn: boolean,
}
export type IImageFile = {
    url: string,
    base64: string,
    size: number,
}
export type fMediaFiles = fMediaFile[];
export type fMediaFile = {
    file: fVideoFile | fImageFile;
    type: 'video' | 'image';
}
export type fVideoFile = {
    url: string,
    thumbnails: string[],
    thumbnail: string,
    duration: number,
    timeStart: number,
    timeEnd: number,
    size: number,
    soundOn: boolean,
}
export type fImageFile = {
    url: string,
    base64: string,
}


export type AddCommentType = {
    idPost: string;
    idUser: string;
    idParent: string;
    content: string;
}

export type RequestCreatePost = {
    idUser: string;
    title: string;
    status: string;
    content: string;
    listUrl: string[];
    openLike: boolean;
    openComment: boolean;
    openPublic: boolean;
}

export type IOnePost = {
    auth: {
        isLike: boolean;
        isMe: boolean;
        isFollow: boolean;
    };
    post: {
        _id: string;
        slug: string;
        title: string;
        status: number;
        content: string;
        type: number;
        listUrl: {
            _id: string;
            type: number;
            accessibility: string;
            height: number;
            width: number;
            url: string;
            timeEnd?: number;
            timeStart?: number;
        }[];
        likes?: number;
        comments?: number;
        hideLikes?: boolean;
        openComment: boolean;
        openPublic?: boolean;
        createdAt: any;
    }
    user: {
        _id: string;
        fullName: string;
        slug: string;
        avatar: string;
        address: string;
        follower: number;
        following: number;
        bio: string;
        birthDay: Date;
        posts: number;
    }
}
export type Response_GetMyPost = {
    code: number;
    message: string;
    data: UPostItem[];
}
export type Response_DetailPost = {
    code: number;
    message: string;
    data: IOnePost;
}

export type ResponseReports = {
    code: number;
    message: string;
    data: IReports;
}
export type IReports = IReport[];
export type IReport = {
    _id: string;
    type: number;
    contentVN: string;
    contentEN: string;
} 