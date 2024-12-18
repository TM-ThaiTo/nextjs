'use client';

import React, { Fragment, useCallback, useEffect, useState } from "react"
import Link from 'next/link'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from "@mui/material/Typography"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"

import { getShortTimeFormat } from '@/helper/formatTime'
import { formatNumber } from '@/helper/formatNumber'
import { action_GetCommentReplyByIdCommentParent, action_GetCommentBySlugPost } from '@/actions/post/comment'
import { IOnePost } from "@/types/post"
import { CommentType } from "@/types/comment"
import RenderActionLikeComment from '@/components/post/render/action-post';
import RenderContent from "@/components/post/render/detail-post-content"
import InputComment from "./input-comment"
import { getLanguage } from "@/helper/mapTypesLanguage"
import useThemeColors from "@/utils/hooks/theme/hookTheme"
import { locales } from "@/language/constant";


type Props = {
    openComment: boolean;
    comments: any;
    myUser: any;
    data: any
}

type DataReply = {
    open: boolean;
    idParent: string;
    data: any;
    count: number;
}

export default function RenderCommentForStatusPost({ openComment, data, comments, myUser }: Props) {
    const { post, auth } = data;

    const lang = getLanguage();
    const { textColorPrimary, textColorSecondary, borderColor } = useThemeColors();

    const [dataReply, setDataReply] = useState<DataReply[]>([]);
    const [listComments, setListComments] = useState<CommentType[]>(comments || []);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [loadingGetComments, setLoadingGetComment] = useState<boolean>(false);
    const [isReply, setIsReply] = useState<boolean>(false);
    const [idReply, setIdReply] = useState<string>('');
    const [slugUserReply, setSlugUserReply] = useState<string>('');

    const handleLoadMoreComments = useCallback(async () => {
        if (loadingGetComments || !hasMore) return;
        setLoadingGetComment(true);
        try {
            const { data: dataComment, error } = await action_GetCommentBySlugPost(data?.post?.slug, page + 1, 5);
            const newComments = dataComment?.data || [];
            if (newComments.length > 0) {
                setListComments(prev => [...prev, ...newComments]);
                setPage(prev => prev + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Failed to load comments', error);
        } finally {
            setLoadingGetComment(false);
        }
    }, [loadingGetComments, hasMore, page, data?.post?.slug]);
    useEffect(() => {
        const handleScroll = () => {
            const container = document.getElementById('comment-container');
            if (container && container.scrollTop + container.clientHeight >= container.scrollHeight - 20) {
                handleLoadMoreComments();
            }
        };

        const container = document.getElementById('comment-container');
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [handleLoadMoreComments]);

    const handleSetReply = useCallback((id: string, slug: string) => {
        setIsReply(true);
        setIdReply(id);
        setSlugUserReply(slug);
    }, []);

    const handleHideReplyComment = (id: string) => {
        setDataReply(prev => prev.map(item =>
            item.idParent === id ? { ...item, open: false } : item
        ));
    };

    const handleGetReplyComment = async (newCommentReply: any = null, id: string, reply: number) => {
        const existingReply = dataReply.find(item => item.idParent === id);
        if (existingReply) {
            setDataReply(prev => prev.map(item =>
                item.idParent === id ? { ...item, open: !item.open, data: newCommentReply ? [...item.data, newCommentReply] : item.data, count: newCommentReply ? item.count + 1 : item.count } : item
            ));
            return;
        }
        try {
            if (!myUser) return;
            const { data, error } = await action_GetCommentReplyByIdCommentParent(id);
            if (error) { alert("Error fetching reply"); return; }
            if (data) {
                const newDataReply = { idParent: id, data: data.data, open: true, count: data.count ?? 0 };
                setDataReply(prev => [...prev, newDataReply]);
            }
        } catch (error) { console.error('handleGetReplyComment: ', error); }
    };

    const renderOneComment = (comment: CommentType, depth = 0) => {
        return (
            <Box key={comment?._id} sx={{ marginLeft: `${depth * 20}px`, marginBottom: '20px' }}>
                <Box sx={{ display: 'flex', marginBottom: '5px' }}>
                    <Box sx={{ width: 40, height: 40 }}>
                        <Link href={`/${comment?.user?.slug}`}>
                            <Avatar src={comment?.user?.avatar || '/static/avt_default.png'} alt={'User'}
                                sx={{ height: 32, width: 32, objectFit: 'cover', border: `0.5px solid ${borderColor}` }} />
                        </Link>
                    </Box>

                    <Box sx={{ marginLeft: '10px', flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                            <Link href={`/${comment?.user?.slug}`} style={{ textDecoration: 'none', color: textColorPrimary, fontSize: 15, fontWeight: 700 }}>
                                {comment?.user?.slug}
                            </Link>
                            <Box sx={{ fontSize: 13, fontWeight: 500, color: textColorSecondary, marginLeft: '10px' }}>
                                {getShortTimeFormat(comment?.createdAt, lang)}
                            </Box>
                        </Box>

                        <Box sx={{ marginBottom: '5px', maxWidth: 270 }}>
                            <Typography component="span" variant="body2" sx={{ fontWeight: 500, fontSize: 15, lineHeight: 1.5, wordWrap: 'break-word' }}>
                                {comment?.content}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: 500, color: 'gray' }}>
                            {comment?.like > 0 && (
                                <Typography component="span" variant="body2">{formatNumber(comment?.like)} Likes</Typography>
                            )}
                            <Typography component="span" variant="body2" sx={{ marginLeft: '20px', cursor: 'pointer' }} onClick={() => handleSetReply(comment?._id, comment?.user?.slug)}>
                                {locales[lang]?.comment.reply}
                            </Typography>
                            <Box sx={{ paddingLeft: '20px', display: 'flex', alignItems: 'center' }}>
                                <MoreHorizIcon />
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ width: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <FavoriteBorderIcon sx={{ fontSize: 20, cursor: 'pointer' }} />
                    </Box>
                </Box>

                {comment?.reply > 0 && (
                    <Box sx={{ paddingLeft: '50px', marginTop: '10px' }}>
                        <Box sx={{ fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                            {dataReply.some(replyItem => replyItem.idParent === comment._id) ? (
                                dataReply.map((replyItem, replyIndex) => (
                                    replyItem.idParent === comment._id && (
                                        <React.Fragment key={replyIndex}>
                                            <Box onClick={() => replyItem.open
                                                ? handleHideReplyComment(replyItem?.idParent)
                                                : handleGetReplyComment(null, replyItem?.idParent, replyItem?.count)}
                                            >
                                                --- {replyItem.open
                                                    ? <>{locales[lang]?.comment.hide}</>
                                                    : <>{locales[lang]?.comment.viewAll}</>
                                                }
                                                <span style={{ marginLeft: '5px' }}>
                                                    {comment?.reply} {comment?.reply > 1
                                                        ? <>{locales[lang]?.comment.replies}</>
                                                        : <>{locales[lang]?.comment.reply1}</>
                                                    }
                                                </span>
                                            </Box>
                                        </React.Fragment>
                                    )
                                ))
                            ) : (
                                <Box onClick={() => handleGetReplyComment(null, comment?._id, comment?.reply)}>
                                    --- {locales[lang]?.comment.viewAll} {comment?.reply} {comment?.reply > 1 ?
                                        <>{locales[lang]?.comment.replies}</> : <>{locales[lang]?.comment.reply1}</>}
                                </Box>
                            )}
                        </Box>

                        <Box sx={{ marginTop: '10px' }}>
                            {dataReply.map((replyItem) => (
                                replyItem.idParent === comment._id && replyItem.open && (
                                    replyItem.data.map((reply: any, idx: any) => (
                                        <Box key={idx} sx={{ marginBottom: '10px' }}>
                                            {renderOneComment(reply, depth + 1)}
                                        </Box>
                                    ))
                                )
                            ))}
                        </Box>
                    </Box>
                )}
            </Box>
        );
    };
    const renderNoAuth = () =>
        <Box sx={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Link href={'/auth/login'} style={{ textDecoration: 'none' }}> {locales[lang]?.login}</Link>
            <Typography component="span" variant="body2" sx={{ ml: 2 }}> {locales[lang]?.comment?.likeOrComment}</Typography>
        </Box>
    return (
        <>
            {openComment &&
                <Box id="comment-container" sx={{ width: '100%', height: 'auto', maxHeight: 400, overflowY: 'auto', padding: '10px', borderBottom: `0.5px solid ${borderColor}` }}>
                    {listComments.length > 0 ? (
                        listComments.map((item: any, index: any) => (
                            <Fragment key={index}>{renderOneComment(item)}</Fragment>
                        ))
                    ) : <Box sx={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{locales[lang]?.comment?.noComment}</Box>}
                    {loadingGetComments && <Box sx={{ textAlign: 'center', padding: '10px 0' }}> {locales[lang]?.loading} </Box>}
                </Box>
            }

            {auth?.isMe || post?.openComment ?
                <Box style={{ width: '100%', height: 60, borderBottom: `1px solid ${borderColor}` }}>
                    {myUser ?
                        <InputComment
                            data={data}
                            myUser={myUser}
                            dataReply={dataReply}
                            setDataReply={setDataReply}
                            setIsReply={setIsReply}
                            setListComments={setListComments}
                            isReply={isReply}
                            idReply={idReply}
                            slugUserReply={slugUserReply}
                        />
                        : renderNoAuth()}
                </Box>
                : null
            }
        </>
    )
}