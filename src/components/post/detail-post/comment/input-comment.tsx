'use client'

import { useCallback, useState, useMemo, useEffect } from "react"
import Box from "@mui/material/Box"
import Image from "next/image"
import TextField from "@mui/material/TextField"
import CircularProgress from "@mui/material/CircularProgress"
import IconButton from "@mui/material/IconButton"
import SendIcon from '@mui/icons-material/Send';
import { EmojiPickerPopup } from "@/helper/emoji"
import { action_AddCommentPost, action_GetCommentReplyByIdCommentParent } from '@/actions/post/comment';
import { AddCommentType, IOnePost } from "@/types/post"
import { CommentType } from "@/types/comment"
import useThemeColors from "@/utils/hooks/theme/hookTheme"
import { getLanguage } from "@/helper/mapTypesLanguage"
import { locales } from "@/language/constant";
import useSnackbar from "@/utils/hooks/snackbar/useSnackbar"
import { Avatar } from "@mui/material"
type InputCommentProps = {
    data: IOnePost,
    myUser: any,
    dataReply: DataReply[],
    setDataReply: React.Dispatch<React.SetStateAction<DataReply[]>>,
    setListComments: React.Dispatch<React.SetStateAction<CommentType[]>>,
    isReply: boolean,
    setIsReply: React.Dispatch<React.SetStateAction<boolean>>,
    idReply: string,
    slugUserReply: string,
}

type DataReply = {
    open: boolean;
    idParent: string;
    data: any;
    count: number;
}

export default function InputComment({
    data,
    myUser,
    dataReply, setDataReply,
    setListComments,
    isReply, setIsReply,
    idReply,
    slugUserReply,
}: InputCommentProps) {
    const { textColorPrimary, borderColor } = useThemeColors();
    const { setOpenSnackbar, setSnackbarMessage } = useSnackbar();
    const lang = getLanguage();

    const { post } = data;
    const [comment, setComment] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleChangeComment = (event: React.ChangeEvent<HTMLInputElement>) => { setComment(event.target.value); };
    const handleEmojiSelect = (emoji: string) => { setComment(prevComment => prevComment + emoji); };

    const handleEndComment = useCallback(() => {
        setIsReply(false);
        setComment('');
    }, [setIsReply]);

    useEffect(() => {
        if (!comment) handleEndComment();
    }, [comment, handleEndComment]);

    useEffect(() => {
        if (isReply) setComment(`@${slugUserReply} `)
    }, [isReply, slugUserReply])

    const handleGetReplyComment = useCallback(async (newCommentReply: any = null, id: string, reply: number) => {
        if (!myUser) return;

        const existingReply = dataReply.find(item => item.idParent === id && item.count === reply);
        if (existingReply) {
            setDataReply(prev => prev.map(item =>
                item.idParent === id ? { ...item, open: !item.open, data: newCommentReply ? [...item.data, newCommentReply] : item.data, count: newCommentReply ? item.count + 1 : item.count } : item
            ));
            return existingReply.data;
        }

        try {
            const { data, error } = await action_GetCommentReplyByIdCommentParent(id);
            if (error) throw new Error("Error fetching reply");

            if (data) {
                const itemComment = data?.data;
                const count = data?.count ?? 0;
                const newDataReply = { idParent: id, data: itemComment, open: true, count };
                setDataReply(prev => {
                    const existingIndex = prev.findIndex(reply => reply.idParent === id);
                    return existingIndex !== -1
                        ? prev.map((item, index) => index === existingIndex ? newDataReply : item)
                        : [...prev, newDataReply];
                });
            }
        } catch (error) {
            console.error('handleGetReplyComment: ', error);
        }
    }, [myUser, dataReply, setDataReply]);

    const handleAddComment = useCallback(async () => {
        if (!myUser) return;

        setLoading(true);
        try {
            const newComment: AddCommentType = {
                content: isReply ? comment.replace(`@${slugUserReply}`, '').trim() : comment,
                idUser: myUser.id.toString(),
                idPost: post._id,
                idParent: isReply ? idReply : '',
            };

            const { data, error } = await action_AddCommentPost(newComment);
            if (error) { setSnackbarMessage({ type: 'error', message: error?.message }); setOpenSnackbar(true); }
            if (data) {
                if (isReply) {
                    setListComments(prev => prev.map(item => item._id === idReply ? { ...item, reply: (item.reply || 0) + 1 } : item));
                    await handleGetReplyComment(data, idReply, data?.count);
                } else {
                    setListComments(prev => [data, ...prev]);
                }
            }
            handleEndComment();
        } catch (error) { console.error('Error adding comment, ', error); }
        finally { setLoading(false); }
    }, [comment, myUser, isReply, post._id, idReply, slugUserReply, handleGetReplyComment, setListComments, handleEndComment, setOpenSnackbar, setSnackbarMessage]);

    const isCommentValid = useMemo(() => comment.trim().length > 0, [comment]);
    return (
        <Box sx={{ height: 60, width: '100%', paddingLeft: '10px', display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: 50, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Avatar src={myUser?.avatar || '/static/avt_default.png'} alt='avatar' style={{ width: 32, height: 32, borderRadius: '50%', border: `0.5px solid ${borderColor}`, objectFit: 'cover' }} />
            </Box>
            <TextField
                multiline={false}
                sx={{
                    width: '95%', marginLeft: '5px', border: 'none', fontSize: 10,
                    '& .MuiInputBase-input::placeholder': { fontSize: 15, color: textColorPrimary, },
                }}
                variant="standard"
                inputProps={{ maxLength: 100 }}
                placeholder={locales[lang]?.comment?.addComment}
                value={comment}
                onChange={handleChangeComment}
            />
            <EmojiPickerPopup onEmojiSelect={handleEmojiSelect} />
            <Box sx={{ width: 30, display: 'flex', alignItems: 'center' }}>
                {loading ? (
                    <CircularProgress size={24} />
                ) : (
                    isCommentValid && (
                        <IconButton sx={{ color: textColorPrimary }} onClick={handleAddComment}>
                            <SendIcon sx={{ fontSize: 19 }} />
                        </IconButton>
                    )
                )}
            </Box>
        </Box>
    )
}