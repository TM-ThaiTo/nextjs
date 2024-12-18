'use client'

import { useMediaQuery, CircularProgress } from '@mui/material';
import ItemExplore from './ItemExplore';
import { useCallback, useEffect, useState } from 'react';
import { useIntersection } from "@mantine/hooks";
import { action_getExplore } from '@/actions/post/actions';

type Props = {
    data: any;
    page: number;
    limit: number;
}

export default function LoadExplore({ data, limit }: Props) {
    const [posts, setPosts] = useState<any[]>(data);
    const [page, setPage] = useState<number>(1);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [isEndPost, setIsEndPost] = useState<boolean>(false);
    const [isGroupData, setIsGroupData] = useState<any[]>([]);

    const isTablet = useMediaQuery("(max-width: 1024px)");
    const isMobile = useMediaQuery("(max-width: 640px)");

    const getPost = useCallback(async () => {
        if (isFetching || isEndPost) return;
        setIsFetching(true); // Set loading to true when fetching posts
        try {
            const { data, error } = await action_getExplore(page, limit);
            if (error) { setIsEndPost(true) };

            if (data) {
                if (data?.data.length > 0) {
                    const newPosts = data?.data;
                    setPage((prevPage) => prevPage + 1); // Increment page number for the next fetch
                    setPosts((prevPosts) => [...prevPosts, ...data.data]);

                    const group: any[] = [];
                    for (let i = 0; i < newPosts?.length; i += 5) {
                        group.push(newPosts.slice(i, i + 5));
                    }

                    setIsGroupData(prev => [
                        ...prev,
                        ...group,
                    ]);
                } else {
                    setIsEndPost(true)
                }
            }
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setIsFetching(false); // Reset loading state
        }
    }, [page, isFetching, isEndPost, limit]);

    const { ref, entry } = useIntersection({ root: null, threshold: 1, });

    useEffect(() => {
        if (entry?.isIntersecting) { getPost(); }
        if (page === 1) {
            const group = [];
            for (let i = 0; i < data?.length; i += 5) {
                group.push(data.slice(i, i + 5));
            }
            setIsGroupData(group);
        }
    }, [entry, getPost, isGroupData, posts, data, page]);



    const render5itemRight = (group: any[]) => {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                <div
                    style={{
                        display: 'grid',
                        gap: 3,
                        width: '100%',
                        maxWidth: isMobile ? '100%' : isTablet ? '90%' : '975px',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gridTemplateRows: 'repeat(2, 1fr)',
                        gridTemplateAreas: `
                            "item1 item2 item5"
                            "item3 item4 item5"
                        `,
                    }}
                >
                    {group.map((item: any, index: number) => {
                        const areaName =
                            index === 0
                                ? 'item1'
                                : index === 1
                                    ? 'item2'
                                    : index === 2
                                        ? 'item3'
                                        : index === 3
                                            ? 'item4'
                                            : 'item5';

                        const isLargeItem = index === 4;
                        const typeItem = isLargeItem ? 1 : 0;

                        return (
                            <div
                                key={index}
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    paddingTop: isLargeItem ? 'calc(200% + 3px)' : '100%',
                                    gridArea: areaName,
                                }}
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                    }}
                                >
                                    <ItemExplore
                                        data={item}
                                        isMobile={isMobile}
                                        isTablet={isTablet}
                                        typeItem={typeItem} // Truyền typeItem vào ItemExplore
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
    const render5itemLeft = (group: any[]) => {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                <div
                    style={{
                        display: 'grid',
                        gap: 3,
                        width: '100%',
                        maxWidth: isMobile ? '100%' : isTablet ? '90%' : '975px',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gridTemplateRows: 'repeat(2, 1fr)',
                        gridTemplateAreas: `
                            "item5 item2 item3"
                            "item5 item4 item1"
                        `,
                    }}
                >
                    {group.map((item: any, index: number) => {
                        const areaName =
                            index === 0
                                ? 'item1'
                                : index === 1
                                    ? 'item2'
                                    : index === 2
                                        ? 'item3'
                                        : index === 3
                                            ? 'item4'
                                            : 'item5';

                        const isLargeItem = index === 4; // Item thứ 5 là chữ nhật
                        const typeItem = isLargeItem ? 1 : 0;

                        return (
                            <div
                                key={index}
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    paddingTop: isLargeItem ? 'calc(200% + 3px)' : '100%',
                                    gridArea: areaName,
                                }}
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                    }}
                                >
                                    <ItemExplore
                                        data={item}
                                        isMobile={isMobile}
                                        isTablet={isTablet}
                                        typeItem={typeItem} // Truyền typeItem vào ItemExplore
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <section>
            <div style={{ marginBottom: isMobile ? 100 : undefined }}>
                {isGroupData.map((group, index) =>
                    index % 2 === 0
                        ? render5itemRight(group)
                        : render5itemLeft(group)
                )}
            </div>
            <div ref={ref} style={{ height: '1px', marginTop: '20px' }} />
            {isFetching && (
                <div style={{ textAlign: 'center', marginTop: 20 }}>
                    <CircularProgress />
                    <p>Loading more posts...</p>
                </div>
            )}
        </section>
    );
}
