'use client';

import { useState, useEffect, useCallback } from 'react';
import { useIntersection } from '@mantine/hooks';
import { action_GetPostHome } from '@/actions/post/actions';
import Posts from './app.posts';
import CircularProgress from '@mui/material/CircularProgress';

type LoadPostProps = {
    data: any[];
    myUser: any;
};

export default function LoadPostsHomePage({ data, myUser }: LoadPostProps) {
    const [posts, setPosts] = useState<any[]>(data);
    const [page, setPage] = useState<number>(2);
    const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
    const [isEndPost, setIsEndPost] = useState<boolean>(false);

    const fetchData = useCallback(async () => {
        if (isFetchingMore || isEndPost) return;
        setIsFetchingMore(true);
        try {
            const { data, error } = await action_GetPostHome(page, 3);
            if (error) return;

            if (data) {
                const newPosts = data?.data;
                if (newPosts.length === 0) {
                    setIsEndPost(true); // No more posts to load
                } else {
                    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
                    setPage((prevPage) => prevPage + 1);
                }
            }
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setIsFetchingMore(false);
        }
    }, [page, isFetchingMore, isEndPost]);

    const { ref, entry } = useIntersection({
        root: null,
        threshold: 1,
    });

    useEffect(() => {
        if (entry?.isIntersecting) {
            fetchData();
        }
    }, [entry, fetchData]);

    if (posts.length === 0) return <div>No post</div>;

    return (
        <>
            <Posts data={posts} myUser={myUser} />
            {isFetchingMore && <div style={{ marginTop: '20px', marginBottom: '30px' }}><CircularProgress /></div>}
            <div ref={ref} style={{ height: '1px', marginTop: '20px' }} />
            {isEndPost && <div>End of posts</div>}
        </>
    );
}
