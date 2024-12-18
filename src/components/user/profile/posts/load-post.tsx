'use client'

import { useEffect, useState, useCallback } from "react";
import { api } from '@/utils/api';
import { Response_GetMyPost } from "@/types/post";
import MyPostsForm from "./user-posts";
import { useIntersection } from "@mantine/hooks";

type LoadPostProfileProps = {
    slug: string,
    data: any;
}

export default function LoadPostProfile({ data, slug }: LoadPostProfileProps) {
    const [posts, setPosts] = useState<any[]>(data);
    const [page, setPage] = useState<number>(1);
    const [isFetching, setIsFetching] = useState<boolean>(false); // Used for tracking loading state
    const [isEndPost, setIsEndPost] = useState<boolean>(false);
    const limit = 4;

    const getPost = useCallback(async () => {
        if (isFetching || isEndPost) return;
        setIsFetching(true); // Set loading to true when fetching posts
        try {
            const { data, error } = await api<Response_GetMyPost>(`/post/user/${slug}?page=${page}&limit=${limit}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (error) { setIsEndPost(true) };

            if (data) {
                if (data?.data.length > 0) {
                    setPage((prevPage) => prevPage + 1); // Increment page number for the next fetch
                    setPosts((prevPosts) => [...prevPosts, ...data.data]); // Append new posts
                } else {
                    setIsEndPost(true)
                }
            }
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setIsFetching(false); // Reset loading state
        }
    }, [slug, page, isFetching, isEndPost]);

    // Intersection observer to detect when the user reaches the end of the list
    const { ref, entry } = useIntersection({
        root: null,  // Observe the viewport
        threshold: 1, // Trigger when fully visible
    });

    useEffect(() => {
        if (entry?.isIntersecting) {
            getPost(); // Fetch more posts when the last post is in view
        }
    }, [entry, getPost]);

    return (
        <>
            <MyPostsForm data={posts} />
            {isFetching && <div>Loading...</div>}
            <div ref={ref} style={{ height: '1px', marginTop: '20px' }} /> {/* This element acts as the target for intersection observer */}
            {isEndPost && <div />}
        </>
    );
}
