'use client'
import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import RenderImage from "@/components/post/medias/render-iamge";
import RenderNameAndAvt from "@/components/post/render/name-avt-post";
import { IOnePost, } from "@/types/post";
import { CommentType } from "@/types/comment";
import RenderCommentDetailPost from "./comment/render-comments";
import MyPostsForm from '@/components/user/profile/posts/user-posts'
import Link from "next/link";
import { Typography } from "@mui/material";
import { style_main_detail, style_main_w_d_fd_al } from "./styles";
import RenderVideo from "../medias/render-video";
import useThemeColors from "@/utils/hooks/theme/hookTheme";
import { getLanguage } from "@/helper/mapTypesLanguage";
import { locales } from '@/language/constant'

type DetaiPostProps = {
    data: IOnePost,
    comments?: CommentType[];
    myUser?: {
        id: number;
        email: string;
        name: string;
        slug: string;
        avatar: string;
    };
    posts?: any,
}

export const DetailPost = ({ data, comments, myUser, posts }: DetaiPostProps) => {
    const lang = getLanguage();
    const { user, post } = data;
    const { theme, borderColor, textColorSecondary, textColorPrimary } = useThemeColors();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const dimensions = useMemo(() => ({
        postMaxWidth: isMobile ? '95vw' : isTablet ? '600px' : '935px',
        imageWidth: isMobile ? '95vw' : isTablet ? '300px' : '600px',
        imageHeight: isMobile ? 'auto' : isTablet ? '300px' : '600px',
        postMaxHeight: isMobile ? 'auto' : '700px',
    }), [isMobile, isTablet]);

    const renderMorePosts = () => {
        return (
            <Box sx={{ display: 'flex' }}>
                <Typography sx={{ color: textColorSecondary, fontWeight: 600, paddingRight: '5px' }}>
                    {locales[lang]?.detailPost?.morePostsFrom}
                </Typography>
                <Link href={`/${user?.slug}`} style={{ textDecoration: 'none', color: textColorPrimary }}>
                    <Typography sx={{ fontWeight: 800 }}>
                        {user?.fullName || user?.slug}
                    </Typography>
                </Link>
            </Box>
        )
    }

    return (
        <div style={{ width: '100%', height: '100%', marginBottom: isMobile ? '100px' : undefined }}>
            <Box sx={{
                width: '100%',
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', marginTop: isTablet ? '140px' : undefined
            }}>
                <Box sx={style_main_detail}>
                    <Box sx={{ maxWidth: dimensions.postMaxWidth, maxHeight: dimensions.postMaxHeight, width: '100%', padding: '20px 0' }}>
                        {isMobile && (
                            <Box sx={{ width: '100%', borderBottom: `0.5px solid ${borderColor}` }}>
                                <RenderNameAndAvt data={data} myUser={myUser} />
                            </Box>
                        )}
                        <Box sx={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px',
                            height: dimensions.imageHeight,
                            flexDirection: isMobile ? 'column' : 'row',
                        }}>
                            <Box sx={{
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                height: dimensions.imageHeight,
                                flex: isMobile ? 'none' : 1,
                                width: dimensions.imageWidth,
                            }}>
                                {post?.type === 1
                                    ? <RenderImage listUrl={post?.listUrl} h={isMobile ? '95vw' : '600px'} w="100%" o={'cover'} />
                                    : <RenderVideo listUrl={post?.listUrl} h={isMobile ? '95vw' : '600px'} w="100%" o={'cover'} />
                                }
                            </Box>
                            <Box sx={{
                                width: isMobile ? '100%' : 336,
                                height: isMobile ? 'auto' : 600,
                                maxHeight: 600, display: 'flex', flexDirection: 'column',
                                borderRight: `1px solid ${borderColor}`,
                                borderTop: `1px solid ${borderColor}`,
                            }}>
                                {!isMobile && (
                                    <Box sx={{ width: '100%', borderBottom: `1px solid ${borderColor}` }}>
                                        <RenderNameAndAvt data={data} myUser={myUser} />
                                    </Box>
                                )}
                                {post?.openComment
                                    ? <RenderCommentDetailPost data={data} comments={comments} myUser={myUser} />
                                    : <Box sx={{ textAlign: 'center', color: 'gray', marginTop: 20 }}>No public comments and comment</Box>
                                }
                            </Box>
                        </Box>
                    </Box>

                    {posts && (
                        <>
                            <Box sx={{ width: 935, height: '1px', backgroundColor: borderColor, margin: '20px 0', marginTop: isTablet ? '140px' : '20px' }} />
                            <Box sx={{ height: 'auto', marginTop: !isTablet ? '20px' : undefined }}>
                                {renderMorePosts()}
                                <MyPostsForm data={posts} />
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
        </div>
    )
}