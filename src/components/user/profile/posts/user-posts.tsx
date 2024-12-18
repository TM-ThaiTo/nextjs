'use client'

import { memo } from 'react';
import { useMediaQuery } from '@mui/material';
import MyPostItem from './post-item'
import { UPostItem } from '../../types';

type MyPostsProp = {
    data: UPostItem[]
}

const MyPostsForm = memo(({ data }: MyPostsProp) => {
    const isTablet = useMediaQuery("(max-width: 1024px)");
    const isMobile = useMediaQuery("(max-width: 640px)");
    return (
        <section>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{
                    display: 'grid',
                    gap: 3,
                    marginTop: 10,
                    justifyContent: 'center',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    width: '100%',
                    maxWidth: isMobile ? '100%' : isTablet ? '90%' : '935px',
                }}>
                    {data?.map((item: UPostItem, index: number) => (
                        <MyPostItem key={index} data={item} isMobile={isMobile} isTablet={isTablet} />
                    ))}
                </div>
            </div >
        </section>
    )
})

MyPostsForm.displayName = 'MyPostsForm';
export default MyPostsForm;