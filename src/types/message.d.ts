export type Rooms = Room[];
export type Room = {
    conversation: {
        _id: string,
        slug: string,
        creator: string,
        recipient: string,
        status: string,
        lastMessageAt: IMessage,
        createdAt: Date,
        updatedAt: Date,
    }
    otherUser: User,
}
export type User = {
    _id: string;
    slug: string;
    fullName: string;
    birthDay: Date,
    address: string,
    bio: string,
    follower: number,
    following: number,
    posts: number,
    avatar: string;
}

export type ResponseMessages = {
    code: number;
    message: string;
    data: Messages;
    total: number;
    count: number;
    page: number;
    limit: number;
    totalPage: number;
}


export type Messages = Message[];
export type Message = {
    message: IMessage;
    userReceiver: User;
    userSender: User;
    date: Date;
}
export type IMessage = {
    _id: string,
    idConversation: string,
    sender: string,
    receiver: string,
    content: string,
    url: string,
    file: string,
    isRead: boolean,
    type: number,
    createdAt: Date,
    updatedAt: Date
}