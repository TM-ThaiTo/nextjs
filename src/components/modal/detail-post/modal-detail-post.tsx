'use client';

import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from '@mui/icons-material/Close';

import RenderImage from '@/components/post/medias/render-iamge';
import RenderVideo from '@/components/post/medias/render-video';
import RenderNameAndAvt from '@/components/post/render/name-avt-post';
import RenderCommentDetailPost from '@/components/post/detail-post/comment/render-comments';

import { action_GetCommentBySlugPost } from '@/actions/post/comment';
import importThemeAndLanguge from '@/helper/importThemeAndLanguge';

type Props = {
    open: boolean
    onClose: () => void
    myUser: any,
    data: any,
}

export default function ModalDetailPost({ open, onClose, myUser, data }: Props) {
    const { post } = data;
    const { lang, locales, useThemeColors } = importThemeAndLanguge();
    const { theme, textColorPrimary, borderColor, backgroundColor, actionHoverColor, boxColor } = useThemeColors();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const [comments, setComments] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            const { data, error } = await action_GetCommentBySlugPost(post?.slug);
            if (error) setComments([]);
            if (data) setComments(data?.data);
            setLoading(false);
        };
        if (open) fetchComments();
    }, [open, post]);

    const { adjustedWidth, adjustedHeight } = useMemo(() => {
        const maxWidth = isMobile ? 0.9 * window.innerWidth : 0.9 * 1200;
        const maxHeight = 0.9 * window.innerHeight;
        const imageWidth = post?.listUrl[0]?.width || 1;
        const imageHeight = post?.listUrl[0]?.height || 1;

        const aspectRatio = imageWidth / imageHeight;

        let width = maxWidth;
        let height = width / aspectRatio;

        if (height > maxHeight) {
            height = maxHeight;
            width = height * aspectRatio;
        }

        return { adjustedWidth: width, adjustedHeight: height };
    }, [post?.listUrl, isMobile]);

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ height: '100vh', width: '100%' }}>
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        zIndex: 1,
                        backgroundColor: backgroundColor,
                        color: textColorPrimary,
                        '&:hover': { backgroundColor: actionHoverColor },
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <Box
                    sx={{
                        maxHeight: '90vh',
                        maxWidth: '90%',
                        width: 'auto',
                        height: 'auto',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        boxShadow: 24,
                        backgroundColor: backgroundColor,

                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', borderRadius: '10px' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: adjustedWidth,
                                height: adjustedHeight,
                                flex: isMobile ? 'none' : 1,
                            }}
                        >
                            {post?.type === 1 ? (
                                <RenderImage listUrl={post?.listUrl} h={`${adjustedHeight}px`} w={`${adjustedWidth}px`} o={'cover'} />
                            ) : (
                                <RenderVideo listUrl={post?.listUrl} h={`${adjustedHeight}px`} w={`${adjustedWidth}px`} o={'cover'} />
                            )}
                        </Box>

                        <Box
                            sx={{
                                width: isMobile ? '100%' : 400,
                                maxHeight: '90vh',
                                height: adjustedHeight,
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: boxColor,
                                borderRight: `1px solid ${borderColor}`,
                                borderTop: `1px solid ${borderColor}`,
                            }}
                        >
                            {!isMobile && (
                                <Box sx={{ width: '100%', borderBottom: `1px solid ${borderColor}` }}>
                                    <RenderNameAndAvt data={data} myUser={myUser} />
                                </Box>
                            )}
                            {loading ? (
                                <Box
                                    sx={{
                                        height: '100%',
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center', alignItems: 'center',
                                    }} >
                                    <CircularProgress />
                                </Box>
                            ) : post?.openComment ? (
                                <RenderCommentDetailPost data={data} comments={comments} myUser={myUser} />
                            ) : (
                                <Box sx={{ textAlign: 'center', color: 'gray', marginTop: 20 }}>
                                    {locales[lang]?.detailPost?.noPublicComment}
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}
