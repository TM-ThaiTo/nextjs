import React from 'react';
import Post from './app.post';
import { IOnePost } from '@/types/post';

interface PostsProp {
    data: IOnePost[];
    myUser: {
        id: number;
        email: string;
        name: string;
        slug: string;
        avatar: string;
    };
}

const Posts: React.FC<PostsProp> = ({ data, myUser }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {data?.map((post) => (
            <Post key={post?.post?._id} data={post} myUser={myUser} />
        ))}
    </div>
);

export default Posts;
