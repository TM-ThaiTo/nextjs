'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ReelPlayer from './ReelPlayer';
import { useIntersection } from '@mantine/hooks';
import { action_getReels } from '@/actions/post/actions';

type Props = {
    data: any;
    myUser: any;
};

const ReelsList = ({ data, myUser }: Props) => {
    const [dataReel, setDataReel] = useState<any[]>(data);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [page, setPage] = useState<number>(2);
    const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
    const [isEndPost, setIsEndPost] = useState<boolean>(false);

    // Scroll handler to update the current index of the visible reel
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const container = e.currentTarget;
        const itemHeight = container.clientHeight; // Get the height of each reel
        const newIndex = Math.floor(container.scrollTop / itemHeight); // Calculate the index based on scroll position

        // Only update the index and URL if it's different from the current index
        if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex);
            const postSlug = dataReel[newIndex]?.post.slug;
            if (postSlug) {
                window.history.replaceState(null, '', `/reels/${postSlug}`);
            }
        }
    };

    // Function to fetch more reels
    const getReels = useCallback(async () => {
        if (isFetchingMore || isEndPost) return;

        setIsFetchingMore(true);
        try {
            const { data, error } = await action_getReels(page, 3);
            if (error) return;
            if (data) {
                const newPosts = data?.data;
                if (newPosts.length === 0) {
                    setIsEndPost(true); // No more posts to load
                } else {
                    setDataReel((prevDataReel) => [...prevDataReel, ...newPosts]);
                    setPage((prevPage) => prevPage + 1);
                }
            }
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setIsFetchingMore(false);
        }
    }, [isFetchingMore, isEndPost, page]);

    // Intersection hook to trigger fetching when the end of the list is reached
    const { ref, entry } = useIntersection({
        root: null,
        threshold: 1,
    });

    // Fetch more reels when the intersection is triggered (i.e., user reaches the end of the list)
    useEffect(() => {
        if (entry?.isIntersecting) {
            getReels();
        }
    }, [entry, getReels]);

    return (
        <>
            <Box
                sx={{
                    height: '100vh',
                    overflowY: 'scroll',
                    scrollSnapType: 'y mandatory',
                    position: 'relative',
                }}
                onScroll={handleScroll}
            >
                {dataReel.map((item: any, index: number) => {
                    const { post, auth, user } = item;
                    const { listUrl } = post;
                    const { url } = listUrl[0];

                    return (
                        <Box
                            key={index}
                            sx={{
                                height: '95vh',
                                width: '100%',
                                scrollSnapAlign: 'start',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                pt: '10px',
                                pb: '10px',
                            }}
                        >
                            <ReelPlayer url={url} data={item} myUser={myUser} />
                        </Box>
                    );
                })}

            </Box>
            {isFetchingMore && <div>Loading more...</div>}
            <div ref={ref} style={{}} />
        </>
    );
};

export default ReelsList;
