'use client'

import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMediaQuery } from "@mui/material";
import { IOnePost } from '@/types/post';
import RenderActionLikeComment from '@/components/post/render/action-post'
import RenderImage from "@/components/post/medias/render-iamge";
import RenderVideo from '@/components/post/medias/render-video';
import RenderNameAndAvt from '@/components/post/render/name-avt-post'
import useWindowSize from '@/utils/hooks/hook-window-size';
import ModalDetailPost from '@/components/modal/detail-post/modal-detail-post';
import useThemeColors from '@/utils/hooks/theme/hookTheme';
import { getLanguage } from '@/helper/mapTypesLanguage';
import { locales } from '@/language/constant';
interface PostProp {
    data: IOnePost,
    myUser: any;
}

export default function Post({ data, myUser }: PostProp) {
    const lang = getLanguage();
    const { post, auth } = data;
    const [isExpanded, setIsExpanded] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const { theme, textColorPrimary, backgroundColor, borderColor, } = useThemeColors();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { width } = useWindowSize();
    const postWidth = useMemo(() => { if (isMobile) return '95vw'; return '600px'; }, [isMobile]);

    const handleOpenModalDetailPost = () => {
        if (post?.slug) {
            window.history.replaceState(null, '', `/post/${post.slug}`);
            setOpenModal(true);
        }
    };
    const handleCloseModalDetailPost = () => {
        window.history.replaceState(null, '', `/`);
        setOpenModal(false);
    }
    const renderDescription = (type: number = 1) => (
        <Box sx={{ height: 'auto', width: '100%' }}>
            <Typography variant="body1" sx={{ ml: 1 }}>
                {type === 3
                    ? <>
                        <Typography variant="body1">
                            {post?.content}
                        </Typography>
                    </>
                    :
                    <Box sx={{ m: '10px 0' }}>
                        {isExpanded ? post?.content : (
                            <>
                                {post?.content?.length > 50
                                    ? `${post?.content?.substring(0, 30)}...`
                                    : post?.content}
                                {post?.content?.length > 50 && (
                                    <IconButton onClick={() => setIsExpanded(!isExpanded)} sx={{ ml: 1, p: 0, color: 'black' }}>
                                        <ExpandMoreIcon />
                                    </IconButton>
                                )}
                            </>
                        )}
                    </Box>
                }
            </Typography>
        </Box>
    );
    if (post?.type === 3) return (
        <Box height='auto' width={postWidth} alignItems="center" gap={4} sx={{ border: `1px solid ${borderColor}`, backgroundColor: backgroundColor, borderRadius: '5px', maxWidth: postWidth, marginTop: '10px', }} >
            <RenderNameAndAvt data={data} myUser={myUser} />
            {renderDescription(3)}
            <Box sx={{ p: 1, mt: '10px' }}>
                <RenderActionLikeComment data={data} myUser={myUser} />
                <Box sx={{ mt: 2 }}>
                    <Typography sx={{ fontSize: 15, fontWeight: 700, color: textColorPrimary }}>
                        {auth?.isMe || post?.openComment
                            ? `${locales[lang]?.detailPost.viewAll} ${post.comments} ${locales[lang]?.detailPost.comments}`
                            : `${locales[lang]?.detailPost?.viewPost}`
                        }
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
    return (
        <>
            <Box width={postWidth} height='auto' alignItems="center" gap={4} sx={{ backgroundColor: backgroundColor, maxWidth: postWidth, border: `1px solid ${borderColor}`, borderRadius: '5px', marginTop: '10px', }} >
                <RenderNameAndAvt data={data} myUser={myUser} />
                {renderDescription()}
                {post?.type === 1
                    ? <RenderImage listUrl={post?.listUrl} h={isMobile ? '95vw' : '600px'} w="100%" o={'cover'} />
                    : <RenderVideo listUrl={post?.listUrl} h={isMobile ? '95vw' : '600px'} w="100%" o={'cover'} />
                }
                <Box sx={{ p: 1, mt: '10px' }}>
                    <RenderActionLikeComment data={data} myUser={myUser} />
                    <Box sx={{ mt: 2, cursor: 'pointer' }} onClick={handleOpenModalDetailPost}>
                        <Typography sx={{ fontSize: 15, fontWeight: 700, color: textColorPrimary, textDecoration: 'none' }}>
                            {auth?.isMe || post?.openComment
                                ? `${locales[lang]?.detailPost.viewAll} ${post.comments} ${locales[lang]?.detailPost.comments}`
                                : `${locales[lang]?.detailPost?.viewPost}`
                            }
                        </Typography>
                    </Box>
                </Box>
            </Box>
            {openModal && <ModalDetailPost open={openModal} onClose={handleCloseModalDetailPost} myUser={myUser} data={data} />}
        </>
    );
}