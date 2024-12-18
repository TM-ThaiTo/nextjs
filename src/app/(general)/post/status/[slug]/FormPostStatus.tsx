'use client'

import { useMemo, useState } from "react";
import RenderActionLikeComment from "@/components/post/render/action-post";
import RenderNameAndAvt from "@/components/post/render/name-avt-post";
import useWindowSize from "@/utils/hooks/hook-window-size";
import useThemeColors from "@/utils/hooks/theme/hookTheme";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getLanguage } from '@/helper/mapTypesLanguage';
import { locales } from '@/language/constant';
import RenderCommentForStatusPost from "@/components/post/detail-post/comment/render-one-comment";

type Props = {
    data: any;
    comments: any;
    posts?: any;
    myUser: any;
}

export default function FormPostStatus({ data, comments, posts, myUser }: Props) {
    const { post, auth } = data;
    const { theme, textColorPrimary, backgroundColor, borderColor, } = useThemeColors();
    const { width } = useWindowSize();
    const lang = getLanguage();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const postWidth = useMemo(() => { if (isMobile) return '95vw'; return '935px'; }, [isMobile]);

    const [openComment, setOpenComment] = useState<boolean>(true);
    const handleOpenOrCloseComment = () => setOpenComment(!openComment);

    const renderDescription = () => (
        <Box sx={{ height: 'auto', width: '100%' }}>
            <Typography variant="body1" sx={{ ml: 1 }}>
                <Typography variant="body1">
                    {post?.content}
                </Typography>
            </Typography>
        </Box>
    );
    return (
        <Box height='auto' width={postWidth} alignItems="center" gap={4} sx={{ border: `1px solid ${borderColor}`, backgroundColor: backgroundColor, borderRadius: '5px', maxWidth: postWidth, marginTop: '10px', }} >
            <RenderNameAndAvt data={data} myUser={myUser} />
            {renderDescription()}
            <Box sx={{ p: 1, mt: '10px', borderBottom: `1px solid ${borderColor}` }}>
                <RenderActionLikeComment data={data} myUser={myUser} />
                <Box sx={{ mt: 2 }}>
                    <Typography
                        sx={{
                            fontSize: 15,
                            fontWeight: 700,
                            color: textColorPrimary,
                            cursor: auth?.isMe || post?.openComment === 1 || comments?.length === 0 ? 'pointer' : 'default',
                        }}
                        onClick={
                            auth?.isMe || post?.openComment === 1 || post?.comments > 0
                                ? handleOpenOrCloseComment
                                : undefined
                        }
                    >
                        {auth?.isMe || post?.openComment ? (
                            comments?.length === 0 ? (
                                `${locales[lang]?.detailPost.noComment}`
                            ) : openComment ? (
                                `${locales[lang]?.detailPost.hideCommentAllComment}`
                            ) : (
                                `${locales[lang]?.detailPost.viewAll} ${post.comments} ${locales[lang]?.detailPost.comments}`
                            )
                        ) : (
                            `${locales[lang]?.detailPost?.noPublicComment}`
                        )}
                    </Typography>
                </Box>
            </Box>
            <RenderCommentForStatusPost comments={comments} myUser={myUser} data={data} openComment={openComment} />
        </Box>
    )
}