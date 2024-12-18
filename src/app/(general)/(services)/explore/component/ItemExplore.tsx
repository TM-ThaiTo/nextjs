'use client'

import React, { useState, memo } from 'react';
import Favorite from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import Image from 'next/image';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CollectionsIcon from '@mui/icons-material/Collections';
import { formatNumber } from '@/helper/formatNumber';
import useThemeColors from '@/utils/hooks/theme/hookTheme';
import { iconReel, iconReelsFull } from '@/helper/svg_icon';

type ItemPostProp = {
    data: any;
    isMobile: boolean;
    isTablet: boolean;
    typeItem?: number;
}

const style_item_bd_p_ovf_tran_cur = {
    border: '0.1px solid black',
    position: 'relative',
    overflow: 'hidden',
    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
    cursor: 'pointer',
};

const style_hover_item = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    color: 'white',
    fontWeight: 1000,
    background: 'rgba(0, 0, 0, 0.5)',
    padding: '10px',
    borderRadius: '5px',
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.3s ease', // Hiệu ứng mờ
};

const ItemExplore = memo(({ data, isMobile, isTablet, typeItem }: ItemPostProp) => {
    const { post } = data;
    const { actionHoverColor } = useThemeColors()
    const { listUrl, slug, likes, comments, type } = post;
    const [isHovered, setIsHovered] = useState(false);
    const itemSize = isMobile ? '33vw' : isTablet ? '30vw' : '325px';
    const calculatedHeight = typeItem === 1 ? `calc(2 * ${itemSize})` : itemSize;

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
                sx={{
                    width: itemSize,
                    height: calculatedHeight,
                    ...style_item_bd_p_ovf_tran_cur,
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {listUrl && (
                    <>
                        <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
                            <Link href={`/post/${slug}`}>
                                {type === 2 ? (
                                    listUrl?.[0]?.thumbnail ? (
                                        <Image src={listUrl[0].thumbnail} alt={slug || 'default'} layout="fill" objectFit="cover" priority />
                                    ) : (
                                        <div>Image not available</div>
                                    )
                                ) : type === 1 && (
                                    listUrl?.[0]?.url
                                        ? <Image src={listUrl[0].url} alt={slug || 'default'} layout="fill" objectFit="cover" priority />
                                        : <div>Image not available</div>
                                )}
                            </Link>
                        </Box>
                        {listUrl.length > 1 && (
                            <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 2, color: 'white', }} >
                                <Typography component="span" sx={{ display: 'flex', alignItems: 'center', }} >
                                    <CollectionsIcon />
                                </Typography>
                            </Box>
                        )}
                        {type === 2 && (
                            <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 2, color: 'white', }} >
                                <Typography component="span" sx={{ display: 'flex', alignItems: 'center', }} >
                                    {iconReelsFull(24, 'white')}
                                </Typography>
                            </Box>
                        )}
                    </>
                )}
                {(likes > 0 || comments > 0) && (
                    <Link href={`/post/${slug}`}>
                        <Box
                            sx={{
                                ...style_hover_item,
                                opacity: isHovered ? 1 : 0,
                                pointerEvents: isHovered ? 'auto' : 'none',
                            }}
                        >
                            {likes > 0 && (
                                <Typography component="span" sx={{ display: 'flex', alignItems: 'center', fontWeight: 800, }} >
                                    <Favorite fontSize="small" />
                                    &nbsp;{formatNumber(likes)}
                                </Typography>
                            )}
                            {comments > 0 && (
                                <Typography component="span" sx={{ display: 'flex', marginLeft: '20px', alignItems: 'center', fontWeight: 800, }} >
                                    <ChatBubbleIcon fontSize="small" />
                                    &nbsp;{formatNumber(comments)}
                                </Typography>
                            )}
                        </Box>
                    </Link>
                )}
            </Box>
        </Box>
    );
});

ItemExplore.displayName = 'ItemExplore';
export default ItemExplore;
